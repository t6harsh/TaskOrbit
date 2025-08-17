export default {
    data() {
        return {
            services: [],
            serviceRequests: [],
            serviceProfessionals: [],
            unapprovedProfessionals: [],
            users: [],
            reviews: [],
            message: "",
            requestMessage: "",
            professionalMessage: "",
            unapprovedMessage: "",
            userMessage: "",
            reviewMessage: "",
            // State for handling inline confirmations instead of alert/confirm pop-ups
            confirmation: {
                type: null, // e.g., 'deleteService', 'approveProfessional'
                itemId: null,
                message: ''
            }
        };
    },    
    methods: {
        // --- Confirmation Logic ---
        requestConfirmation(type, itemId, message) {
            this.confirmation = { type, itemId, message };
        },
        cancelConfirmation() {
            this.confirmation = { type: null, itemId: null, message: '' };
        },
        async proceedWithConfirmation() {
            const { type, itemId } = this.confirmation;
            if (!type || !itemId) return;

            if (type === 'deleteService') {
                await this.deleteService(itemId);
            } else if (type === 'approveProfessional') {
                await this.approveProfessional(itemId);
            } else if (type === 'toggleUserStatus') {
                const user = this.users.find(u => u.id === itemId);
                if (user) await this.toggleUserStatus(user);
            }
            this.cancelConfirmation();
        },

        // --- Service Methods ---
        async fetchServices() {
            const token = localStorage.getItem("auth_token");
            if (!token) { this.message = "Unauthorized!"; return; }
            try {
                const response = await fetch('/api/service_get', { headers: { "Authorization": token } });
                const data = await response.json();
                if (response.ok) {
                    this.services = data || [];
                    this.message = data.length ? "" : "No services available.";
                } else {
                    this.message = data.error || "Failed to fetch services.";
                }
            } catch (error) {
                this.message = "Error fetching services.";
            }
        },
        async deleteService(serviceId) {
            const token = localStorage.getItem("auth_token");
            if (!token) { this.message = "Unauthorized!"; return; }
            try {
                const response = await fetch(`/api/service_delete/${serviceId}`, {
                    method: 'DELETE',
                    headers: { "Authorization": token }
                });
                if (response.ok) {
                    this.fetchServices(); // Refresh the list
                } else {
                    const data = await response.json();
                    this.message = `Error: ${data.error || 'Failed to delete service'}`;
                }
            } catch (error) {
                this.message = "Failed to delete service. Try again!";
            }
        },

        // --- Professional Methods ---
        async fetchUnapprovedProfessionals() {
            const token = localStorage.getItem("auth_token");
            if (!token) { this.unapprovedMessage = "Unauthorized!"; return; }
            try {
                const response = await fetch('/api/admin/unapproved_providers', { headers: { "Authorization": token } });
                const data = await response.json();
                if (response.ok) {
                    this.unapprovedProfessionals = data || [];
                    this.unapprovedMessage = data.length ? "" : "No unapproved professionals found.";
                } else {
                    this.unapprovedMessage = data.message || "Failed to fetch approvals.";
                }
            } catch (error) {
                this.unapprovedMessage = "Error fetching unapproved professionals.";
            }
        },
        async approveProfessional(providerId) {
            const token = localStorage.getItem("auth_token");
            if (!token) { this.unapprovedMessage = "Unauthorized!"; return; }
            try {
                const response = await fetch(`/api/admin/approve_provider/${providerId}`, {
                    method: 'PUT',
                    headers: { "Authorization": token }
                });
                if (response.ok) {
                    this.fetchUnapprovedProfessionals(); // Refresh the list
                } else {
                    const data = await response.json();
                    this.unapprovedMessage = `Error: ${data.message || 'Failed to approve'}`;
                }
            } catch (error) {
                this.unapprovedMessage = "Failed to approve professional. Try again!";
            }
        },

        // --- User Methods ---
        async fetchUsers() {
            const token = localStorage.getItem("auth_token");
            if (!token) { this.userMessage = "Unauthorized!"; return; }
            try {
                const response = await fetch('/api/admin/users', { headers: { "Authorization": token } });
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
            if (!token) { this.userMessage = "Unauthorized!"; return; }
            try {
                const response = await fetch(`/api/admin/users/${user.id}/toggle`, {
                    method: "PATCH",
                    headers: { "Authorization": token }
                });
                const data = await response.json();
                if (response.ok) {
                    user.active = data.active;
                } else {
                    this.userMessage = `Error: ${data.error || "Failed to update status"}`;
                }
            } catch (error) {
                this.userMessage = "An error occurred while updating user status.";
            }
        },

        // --- Review Methods ---
        async fetchReviews() {
            const token = localStorage.getItem("auth_token");
            if (!token) { this.reviewMessage = "Unauthorized!"; return; }
            try {
                const response = await fetch('/api/admin/reviews', { headers: { "Authorization": token } });
                const data = await response.json();
                if (response.ok) {
                    this.reviews = data.reviews || [];
                    this.reviewMessage = this.reviews.length ? "" : "No reviews found.";
                } else {
                    this.reviewMessage = data.message || "Failed to fetch reviews.";
                }
            } catch (error) {
                this.reviewMessage = "Error fetching reviews.";
            }
        }
    },
    mounted() {
        this.fetchServices();
        this.fetchUnapprovedProfessionals();
        this.fetchUsers();
        this.fetchReviews();
    },
    template: `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #f8f9fc 0%, #e8ecf5 100%); padding: 2rem; font-family: 'Inter', sans-serif; color: #2D3748;">
        <div style="max-width: 1200px; margin: 0 auto;">
            
            <!-- All Services -->
            <div style="padding: 2.5rem; background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(12px); border-radius: 18px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); margin-bottom: 2.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 2px solid #F4A261; padding-bottom: 1rem;">
                    <h2 style="font-family: 'Poppins', sans-serif; font-size: 2rem; font-weight: 600; background: linear-gradient(90deg, #FF7E5F, #F4A261); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Manage Services</h2>
                    <router-link to="/create_service" style="padding: 0.75rem 1.5rem; border-radius: 12px; background: linear-gradient(135deg, #F4A261, #FFB677); color: #fff; font-weight: 600; text-decoration: none; box-shadow: 0 4px 15px rgba(244,162,97,0.4); transition: all 0.3s ease;">+ Create Service</router-link>
                </div>
                <div v-if="message" style="background-color: #f0f4ff; color: #4A5568; padding: 1rem; border-radius: 8px; text-align: center;">{{ message }}</div>
                <div v-else style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
                    <div v-for="service in services" :key="service.id" style="background: #fff; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: all 0.3s ease;">
                        <h5 style="font-family: 'Poppins', sans-serif; font-size: 1.25rem; font-weight: 600; color: #2D3748; margin-bottom: 1rem;">{{ service.name }}</h5>
                        <p style="font-size: 0.9rem; color: #4A5568; margin-bottom: 1rem; min-height: 40px;">{{ service.description }}</p>
                        <p style="font-size: 1rem; font-weight: 600; color: #2D3748; margin-bottom: 1.5rem;">Price: ₹{{ service.base_price }}</p>
                        
                        <div v-if="confirmation.type === 'deleteService' && confirmation.itemId === service.id" style="background-color: #FFF5F5; padding: 1rem; border-radius: 8px; border: 1px solid #FC8181; text-align: center;">
                            <p style="color: #C53030; font-weight: 500; margin-bottom: 1rem;">{{ confirmation.message }}</p>
                            <button @click="proceedWithConfirmation" style="background: #E53E3E; color: white; padding: 0.5rem 1rem; border: none; border-radius: 8px; cursor: pointer; margin-right: 0.5rem;">Confirm Delete</button>
                            <button @click="cancelConfirmation" style="background: #E2E8F0; color: #2D3748; padding: 0.5rem 1rem; border: none; border-radius: 8px; cursor: pointer;">Cancel</button>
                        </div>
                        <div v-else style="display: flex; gap: 0.5rem;">
                            <router-link :to="'/edit_service/' + service.id" style="flex: 1; padding: 0.6rem; border-radius: 8px; background: #EDF2F7; color: #4A5568; font-weight: 500; text-align: center; text-decoration: none;">Edit</router-link>
                            <button @click="requestConfirmation('deleteService', service.id, 'Are you sure? This cannot be undone.')" style="flex: 1; padding: 0.6rem; border-radius: 8px; background: #FED7D7; color: #9B2C2C; font-weight: 500; border: none; cursor: pointer;">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Unapproved Service Professionals -->
            <div style="padding: 2.5rem; background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(12px); border-radius: 18px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); margin-bottom: 2.5rem;">
                <h2 style="font-family: 'Poppins', sans-serif; font-size: 2rem; font-weight: 600; color: #2D3748; margin-bottom: 1.5rem; border-bottom: 2px solid #F4A261; padding-bottom: 1rem;">Approval Requests</h2>
                <div v-if="unapprovedMessage" style="background-color: #f0f4ff; color: #4A5568; padding: 1rem; border-radius: 8px; text-align: center;">{{ unapprovedMessage }}</div>
                <div v-else style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">
                    <div v-for="prof in unapprovedProfessionals" :key="prof.id" style="background: #fff; border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                        <h5 style="font-family: 'Poppins', sans-serif; font-size: 1.25rem; font-weight: 600; color: #2D3748; margin-bottom: 1rem;">{{ prof.name }}</h5>
                        <p style="font-size: 0.9rem; color: #4A5568; margin-bottom: 0.5rem;"><strong>Email:</strong> {{ prof.email }}</p>
                        <p style="font-size: 0.9rem; color: #4A5568; margin-bottom: 0.5rem;"><strong>Service:</strong> {{ prof.service_name }}</p>
                        <p style="font-size: 0.9rem; color: #4A5568; margin-bottom: 1.5rem;"><strong>Experience:</strong> {{ prof.experience }} years</p>
                        
                        <div v-if="confirmation.type === 'approveProfessional' && confirmation.itemId === prof.id" style="background-color: #F0FFF4; padding: 1rem; border-radius: 8px; border: 1px solid #68D391; text-align: center;">
                            <p style="color: #2F855A; font-weight: 500; margin-bottom: 1rem;">{{ confirmation.message }}</p>
                            <button @click="proceedWithConfirmation" style="background: #38A169; color: white; padding: 0.5rem 1rem; border: none; border-radius: 8px; cursor: pointer; margin-right: 0.5rem;">Confirm Approve</button>
                            <button @click="cancelConfirmation" style="background: #E2E8F0; color: #2D3748; padding: 0.5rem 1rem; border: none; border-radius: 8px; cursor: pointer;">Cancel</button>
                        </div>
                        <button v-else @click="requestConfirmation('approveProfessional', prof.id, 'Approve this professional?')" style="width: 100%; padding: 0.75rem; border-radius: 8px; background: #38B2AC; color: #fff; font-weight: 600; border: none; cursor: pointer;">Approve</button>
                    </div>
                </div>
            </div>

            <!-- Manage Users -->
            <div style="padding: 2.5rem; background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(12px); border-radius: 18px; box-shadow: 0 8px 25px rgba(0,0,0,0.1); margin-bottom: 2.5rem;">
                <h2 style="font-family: 'Poppins', sans-serif; font-size: 2rem; font-weight: 600; color: #2D3748; margin-bottom: 1.5rem; border-bottom: 2px solid #F4A261; padding-bottom: 1rem;">Manage Users</h2>
                <div v-if="userMessage" style="background-color: #f0f4ff; color: #4A5568; padding: 1rem; border-radius: 8px; text-align: center;">{{ userMessage }}</div>
                <div v-else style="overflow-x: auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f7fafc; color: #4A5568;">
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Name</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Email</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Role</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Status</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: center; font-weight: 600;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.id" style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ user.name }}</td>
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ user.email }}</td>
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem; text-transform: capitalize;">{{ user.role.replace('_', ' ') }}</td>
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">
                                    <span :style="{ color: user.active ? '#2F855A' : '#9B2C2C', background: user.active ? '#C6F6D5' : '#FED7D7', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontWeight: '500' }">
                                        {{ user.active ? 'Active' : 'Blocked' }}
                                    </span>
                                </td>
                                <td style="padding: 1rem 1.5rem; text-align: center;">
                                    <button @click="requestConfirmation('toggleUserStatus', user.id, 'Are you sure?')" :style="{ background: user.active ? '#FED7D7' : '#C6F6D5', color: user.active ? '#9B2C2C' : '#2F855A', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '500' }">
                                        {{ user.active ? 'Block' : 'Unblock' }}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- All Reviews -->
            <div style="padding: 2.5rem; background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(12px); border-radius: 18px; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">
                <h2 style="font-family: 'Poppins', sans-serif; font-size: 2rem; font-weight: 600; color: #2D3748; margin-bottom: 1.5rem; border-bottom: 2px solid #F4A261; padding-bottom: 1rem;">All Reviews</h2>
                <div v-if="reviewMessage" style="background-color: #f0f4ff; color: #4A5568; padding: 1rem; border-radius: 8px; text-align: center;">{{ reviewMessage }}</div>
                <div v-else style="overflow-x: auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f7fafc; color: #4A5568;">
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Customer</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Provider</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Service</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Rating</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Review</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="review in reviews" :key="review.id" style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ review.customer_name }}</td>
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ review.service_provider_name }}</td>
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ review.service_name }}</td>
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ review.rating }} / 5</td>
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ review.review_description }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <p style="font-size: 0.8rem; color: #718096; text-align: center; margin-top: 3rem;">Created by Thakur Harsh Pratap Singh</p>
        </div>
    </div>
    `
};
