export default {
    data() {
        return {
            services: [],
            serviceRequests: [],
            serviceProfessionals: [],
            unapprovedProfessionals: [],
            message: "",
            requestMessage: "",
            professionalMessage: "",
            unapprovedMessage: "",
            users: [],
            userMessage: "",
            reviews: [],
            reviewMessage: ""
        };
    },    
    methods: {
        async fetchServices() {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                this.message = "Unauthorized! Please log in.";
                return;
            }
            try {
                const response = await fetch('/api/service_get', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    this.services = data.length ? data : [];
                    this.message = data.length ? "" : "No services available.";
                } else {
                    this.message = data.error || "Failed to fetch services.";
                }
            } catch (error) {
                console.error("Error fetching services:", error);
                this.message = "Error fetching services.";
            }
        },
        async deleteService(serviceId) {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                alert("Unauthorized! Please log in.");
                return;
            }
            if (!confirm("Are you sure you want to delete this service?")) {
                return;
            }
            try {
                const response = await fetch(`/api/service_delete/${serviceId}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    alert("Service deleted successfully!");
                    this.fetchServices();
                } else {
                    alert(`Error deleting service: ${data.error || response.status}`);
                }
            } catch (error) {
                console.error("Error deleting service:", error);
                alert("Failed to delete service. Try again!");
            }
        },
        async fetchServiceRequests() {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                this.requestMessage = "Unauthorized! Please log in.";
                return;
            }
            try {
                const response = await fetch('/api/service_requests', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    this.serviceRequests = data.service_requests.length ? data.service_requests : [];
                    this.requestMessage = data.service_requests.length ? "" : "No service requests found.";
                } else {
                    this.requestMessage = data.message || "Failed to fetch service requests.";
                }
            } catch (error) {
                console.error("Error fetching service requests:", error);
                this.requestMessage = "Error fetching service requests.";
            }
        },
        async fetchServiceProfessionals() {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                this.professionalMessage = "Unauthorized! Please log in.";
                return;
            }
            try {
                const response = await fetch('/api/admin/service_professionals', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    this.serviceProfessionals = data.service_professionals.length ? data.service_professionals : [];
                    this.professionalMessage = data.service_professionals.length ? "" : "No service professionals found.";
                } else {
                    this.professionalMessage = data.message || "Failed to fetch service professionals.";
                }
            } catch (error) {
                console.error("Error fetching service professionals:", error);
                this.professionalMessage = "Error fetching service professionals.";
            }
        },
        async fetchUnapprovedProfessionals() {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                this.unapprovedMessage = "Unauthorized! Please log in.";
                return;
            }
            try {
                const response = await fetch('/api/admin/unapproved_providers', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    this.unapprovedProfessionals = data.length ? data : [];
                    this.unapprovedMessage = data.length ? "" : "No unapproved professionals found.";
                } else {
                    this.unapprovedMessage = data.message || "Failed to fetch unapproved professionals.";
                }
            } catch (error) {
                console.error("Error fetching unapproved professionals:", error);
                this.unapprovedMessage = "Error fetching unapproved professionals.";
            }
        },
        async approveProfessional(providerId) {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                alert("Unauthorized! Please log in.");
                return;
            }
            if (!confirm("Are you sure you want to approve this professional?")) {
                return;
            }
            try {
                const response = await fetch(`/api/admin/approve_provider/${providerId}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    alert("Professional approved successfully!");
                    this.unapprovedProfessionals = this.unapprovedProfessionals.filter(provider => provider.id !== providerId);
                } else {
                    alert(`Error approving professional: ${data.message || response.status}`);
                }
            } catch (error) {
                console.error("Error approving professional:", error);
                alert("Failed to approve professional. Try again!");
            }
        },
        async fetchUsers() {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                this.userMessage = "Unauthorized! Please log in.";
                return;
            }
            try {
                const response = await fetch('/api/admin/users', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    this.users = data.users || [];
                    this.userMessage = this.users.length ? "" : "No users found.";
                } else {
                    this.userMessage = data.message || "Failed to fetch users.";
                }
            } catch (error) {
                this.userMessage = "Error fetching users.";
            }
        },
        async toggleUserStatus(user) {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                alert("Unauthorized! Please log in.");
                return;
            }
            if (!confirm(`Are you sure you want to ${user.active ? "block" : "unblock"} this user?`)) {
                return;
            }
            try {
                const response = await fetch(`/api/admin/users/${user.id}/toggle`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    user.active = data.active;
                } else {
                    alert(`Error: ${data.error || "Failed to update user status"}`);
                }
            } catch (error) {
                console.error("Error updating user status:", error);
                alert("An error occurred while updating user status.");
            }
        },
        async fetchReviews() {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                this.reviewMessage = "Unauthorized! Please log in.";
                return;
            }
            try {
                const response = await fetch('/api/admin/reviews', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    this.reviews = data.reviews || [];
                    this.reviewMessage = this.reviews.length ? "" : "No reviews found.";
                } else {
                    this.reviewMessage = data.message || "Failed to fetch reviews.";
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
                this.reviewMessage = "Error fetching reviews.";
            }
        }
    },
    mounted() {
        this.fetchServices();
        this.fetchServiceRequests();
        this.fetchServiceProfessionals();
        this.fetchUnapprovedProfessionals();
        this.fetchUsers();
        this.fetchReviews();
    },
    template: `
        <div style="min-height: 100vh; background: linear-gradient(135deg, #1A2A44 0%, #2A3B5A 100%); padding: 2rem; font-family: 'Inter', sans-serif; color: #A0AEC0;">
            <div style="max-width: 1200px; margin: 0 auto;">
                <!-- All Services -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h2 style="font-family: 'Poppins', sans-serif; font-size: 2rem; font-weight: 600; color: #F4A261;">All Services</h2>
                    <router-link to="/create_service" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: #F4A261; color: #1A2A44; font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 500; text-decoration: none; transition: background 0.3s ease;">+ Create New Service</router-link>
                </div>
                <div v-if="message" style="background: rgba(255, 191, 0, 0.1); color: #FFB700; padding: 1rem; border-radius: 8px; text-align: center; margin-bottom: 1.5rem;">{{ message }}</div>
                <div v-else style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
                    <div v-for="service in services" :key="service.id" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border-radius: 12px; padding: 1.5rem; border: 1px solid rgba(255, 255, 255, 0.2); box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);">
                        <h5 style="font-family: 'Poppins', sans-serif; font-size: 1.25rem; font-weight: 600; color: #FFFFFF; margin-bottom: 1rem;">{{ service.name }}</h5>
                        <p style="font-size: 0.9rem; color: #A0AEC0; margin-bottom: 1rem;">{{ service.description }}</p>
                        <p style="font-size: 0.9rem; color: #A0AEC0; margin-bottom: 1rem;"><strong>Price:</strong> ₹{{ service.base_price }}</p>
                        <div style="display: flex; justify-content: space-between; gap: 1rem;">
                            <router-link :to="'/edit_service/' + service.id" style="flex: 1; padding: 0.5rem; border-radius: 8px; background: #FFB700; color: #1A2A44; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: center; text-decoration: none; transition: background 0.3s ease;">✏️ Edit</router-link>
                            <button @click="deleteService(service.id)" style="flex: 1; padding: 0.5rem; border-radius: 8px; background: #FF6B6B; color: #FFFFFF; font-family: 'Inter', sans-serif; font-size: 0.9rem; border: none; cursor: pointer; transition: background 0.3s ease;">❌ Delete</button>
                        </div>
                    </div>
                </div>

                <!-- Unapproved Service Professionals -->
                <hr style="border-color: #2A3B5A; margin: 3rem 0;" />
                <h2 style="font-family: 'Poppins', sans-serif; font-size: 2rem; font-weight: 600; color: #F4A261; margin-bottom: 1.5rem;">Unapproved Service Professionals</h2>
                <div v-if="unapprovedMessage" style="background: rgba(255, 191, 0, 0.1); color: #FFB700; padding: 1rem; border-radius: 8px; text-align: center; margin-bottom: 1.5rem;">{{ unapprovedMessage }}</div>
                <div v-else style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
                    <div v-for="professional in unapprovedProfessionals" :key="professional.id" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border-radius: 12px; padding: 1.5rem; border: 1px solid rgba(255, 255, 255, 0.2); box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);">
                        <h5 style="font-family: 'Poppins', sans-serif; font-size: 1.25rem; font-weight: 600; color: #FFFFFF; margin-bottom: 1rem;">{{ professional.name }}</h5>
                        <p style="font-size: 0.9rem; color: #A0AEC0; margin-bottom: 0.5rem;"><strong>Email:</strong> {{ professional.email }}</p>
                        <p style="font-size: 0.9rem; color: #A0AEC0; margin-bottom: 0.5rem;"><strong>Service:</strong> {{ professional.service_name }}</p>
                        <p style="font-size: 0.9rem; color: #A0AEC0; margin-bottom: 1rem;"><strong>Experience:</strong> {{ professional.experience }} years</p>
                        <button @click="approveProfessional(professional.id)" style="width: 100%; padding: 0.75rem; border-radius: 8px; background: #4FD1C5; color: #1A2A44; font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 500; border: none; cursor: pointer; transition: background 0.3s ease;">✅ Approve</button>
                    </div>
                </div>

                <!-- Manage Users -->
                <hr style="border-color: #2A3B5A; margin: 3rem 0;" />
                <h2 style="font-family: 'Poppins', sans-serif; font-size: 2rem; font-weight: 600; color: #F4A261; margin-bottom: 1.5rem;">Manage Users</h2>
                <div style="margin-bottom: 1.5rem;">
                    <router-link to="/searchprofessional" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: #4FD1C5; color: #1A2A44; font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 500; text-decoration: none; transition: background 0.3s ease;">Search Professional</router-link>
                </div>
                <div v-if="userMessage" style="background: rgba(255, 191, 0, 0.1); color: #FFB700; padding: 1rem; border-radius: 8px; text-align: center; margin-bottom: 1.5rem;">{{ userMessage }}</div>
                <div v-else style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; background: rgba(255, 255, 255, 0.1); border-radius: 8px;">
                        <thead>
                            <tr style="background: #2A3B5A; color: #FFFFFF;">
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Name</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Email</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Role</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Status</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.id" style="border-bottom: 1px solid #2A3B5A;">
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ user.name }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ user.email }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ user.role }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: user.active ? '#4FD1C5' : '#FF6B6B';">{{ user.active ? 'Unblocked' : 'Blocked' }}</td>
                                <td style="padding: 1rem;">
                                    <button @click="toggleUserStatus(user)" style="padding: 0.5rem 1rem; border-radius: 8px; background: user.active ? '#FF6B6B' : '#4FD1C5'; color: black; font-family: 'Inter', sans-serif; font-size: 0.9rem; border: none; cursor: pointer; transition: background 0.3s ease;">{{ user.active ? '🚫 Block' : '✅ Unblock' }}</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- All Reviews -->
                <hr style="border-color: #2A3B5A; margin: 3rem 0;" />
                <h2 style="font-family: 'Poppins', sans-serif; font-size: 2rem; font-weight: 600; color: #F4A261; margin-bottom: 1.5rem;">All Reviews</h2>
                <div v-if="reviewMessage" style="background: rgba(255, 191, 0, 0.1); color: #FFB700; padding: 1rem; border-radius: 8px; text-align: center; margin-bottom: 1.5rem;">{{ reviewMessage }}</div>
                <div v-else style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; background: rgba(255, 255, 255, 0.1); border-radius: 8px;">
                        <thead>
                            <tr style="background: #2A3B5A; color: #FFFFFF;">
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Customer Name</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Service Provider Name</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Service Name</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Rating</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Review Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="review in reviews" :key="review.id" style="border-bottom: 1px solid #2A3B5A;">
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ review.customer_name }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ review.service_provider_name }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ review.service_name }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ review.rating }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ review.review_description }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Footer Credit -->
                <p style="font-size: 0.8rem; color: #A0AEC0; text-align: center; margin-top: 3rem;">Created by Thakur Harsh Pratap Singh</p>
            </div>
        </div>
    `
};
