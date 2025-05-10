export default {
    data() {
        return {
            username: "",
            availableServices: [],
            inProgressRequests: [],
            completedRequests: [],
            message: ""
        };
    },
    methods: {
        async fetchCustomerData() {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                this.message = "Unauthorized! Please log in.";
                return;
            }
            try {
                const userResponse = await fetch('/api/customer', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                const userData = await userResponse.json();
                if (userResponse.ok) {
                    this.username = userData.username;
                } else {
                    this.message = userData.message || "Failed to fetch user data.";
                }

                const servicesResponse = await fetch('/api/customer/service', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                const servicesData = await servicesResponse.json();
                if (servicesResponse.ok) {
                    this.availableServices = servicesData.service_requests || [];
                } else {
                    this.message = servicesData.message || "Failed to fetch services.";
                }

                const progressResponse = await fetch('/api/customer/in_progress_requests', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                const progressData = await progressResponse.json();
                if (progressResponse.ok) {
                    this.inProgressRequests = progressData.in_progress_requests || [];
                } else {
                    this.message = progressData.message || "Failed to fetch in-progress requests.";
                }

                const completedResponse = await fetch('/api/customer/completed_requests', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                const completedData = await completedResponse.json();
                if (completedResponse.ok) {
                    this.completedRequests = completedData.completed_requests || [];
                } else {
                    this.message = completedData.message || "Failed to fetch completed requests.";
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                this.message = "Error fetching data. Please try again.";
            }
        },
        async completeServiceRequest(requestId) {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                this.message = "Unauthorized! Please log in.";
                return;
            }
            try {
                const response = await fetch(`/api/customer/complete_service_request/${requestId}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                const result = await response.json();
                if (response.ok) {
                    this.message = "Service request completed successfully!";
                    this.fetchCustomerData();
                } else {
                    this.message = result.message || "Failed to complete service request.";
                }
            } catch (error) {
                console.error("Error completing service request:", error);
                this.message = "Error completing service request. Please try again.";
            }
        },
        async requestService(serviceId, serviceProviderId) {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                this.message = "Unauthorized! Please log in.";
                return;
            }
            if (!serviceId || !serviceProviderId) {
                this.message = "Missing required fields. Please try again.";
                return;
            }
            try {
                const response = await fetch('/api/customer/create_service_request', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({
                        service_id: serviceId,
                        service_provider_id: serviceProviderId
                    })
                });
                const result = await response.json();
                if (response.ok) {
                    this.message = "Service request created successfully!";
                    this.fetchCustomerData();
                } else {
                    this.message = result.message || "Failed to create service request.";
                }
            } catch (error) {
                console.error("Error requesting service:", error);
                this.message = "Error requesting service. Please try again.";
            }
        }
    },
    mounted() {
        this.fetchCustomerData();
    },
    template: `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #1A2A44 0%, #2A3B5A 100%); padding: 2rem; font-family: 'Inter', sans-serif; color: #A0AEC0;">
        <div style="max-width: 1200px; margin: 0 auto;">
            <div v-if="message" style="background: rgba(255, 191, 0, 0.1); color: #FFB700; padding: 1rem; border-radius: 8px; text-align: center; margin-bottom: 1.5rem;">{{ message }}</div>
            <div v-else style="text-align: center;">
                <h2 style="font-family: 'Poppins', sans-serif; font-size: 2rem; font-weight: 600; color: #F4A261; margin-bottom: 1.5rem;">Welcome, {{ username }}!</h2>
                <!-- All Services -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.5rem; font-weight: 600; color: #F4A261;">All Services</h3>
                    <router-link to="/searchservice" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: #4FD1C5; color: #1A2A44; font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 500; text-decoration: none; transition: background 0.3s ease;">Search Service</router-link>
                </div>
                <div style="overflow-x: auto; margin-bottom: 2rem;">
                    <table style="width: 100%; border-collapse: collapse; background: rgba(255, 255, 255, 0.1); border-radius: 8px;">
                        <thead>
                            <tr style="background: #2A3B5A; color: #FFFFFF;">
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Service Name</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Service Provider</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Base Price</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Description</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="service in availableServices" :key="service.id" style="border-bottom: 1px solid #2A3B5A;">
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ service.name }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ service.user_name }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">₹{{ service.base_price }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ service.description }}</td>
                                <td style="padding: 1rem;">
                                    <button @click="requestService(service.id, service.service_provider_id)" style="padding: 0.5rem 1rem; border-radius: 8px; background: #F4A261; color: #1A2A44; font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 500; border: none; cursor: pointer; transition: background 0.3s ease;">Request Service</button>
                                </td>
                            </tr>
                            <tr v-if="availableServices.length === 0">
                                <td colspan="5" style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0; text-align: center;">No services available.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- In Progress Requests -->
                <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.5rem; font-weight: 600; color: #F4A261; margin-bottom: 1.5rem;">In Progress Requests</h3>
                <div style="overflow-x: auto; margin-bottom: 2rem;">
                    <table style="width: 100%; border-collapse: collapse; background: rgba(255, 255, 255, 0.1); border-radius: 8px;">
                        <thead>
                            <tr style="background: #2A3B5A; color: #FFFFFF;">
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Service Name</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Service Provider</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Status</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Date of Register</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="request in inProgressRequests" :key="request.id" style="border-bottom: 1px solid #2A3B5A;">
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ request.service_name }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ request.service_provider_email }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ request.service_status }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ request.date_of_register }}</td>
                                <td style="padding: 1rem;">
                                    <button @click="completeServiceRequest(request.id)" style="padding: 0.5rem 1rem; border-radius: 8px; background: #4FD1C5; color: #1A2A44; font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 500; border: none; cursor: pointer; transition: background 0.3s ease;">Complete</button>
                                </td>
                            </tr>
                            <tr v-if="inProgressRequests.length === 0">
                                <td colspan="5" style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0; text-align: center;">No in-progress requests.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- Completed Requests -->
                <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.5rem; font-weight: 600; color: #F4A261; margin-bottom: 1.5rem;">Completed Requests</h3>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; background: rgba(255, 255, 255, 0.1); border-radius: 8px;">
                        <thead>
                            <tr style="background: #2A3B5A; color: #FFFFFF;">
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Service Name</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Service Provider</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Status</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Completion Date</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="request in completedRequests" :key="request.id" style="border-bottom: 1px solid #2A3B5A;">
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ request.service_name }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ request.service_provider_email }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ request.service_status }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ request.date_of_completion }}</td>
                                <td style="padding: 1rem;">
                                    <router-link :to="'/review/' + request.id" style="padding: 0.5rem 1rem; border-radius: 8px; background: #FFB700; color: #1A2A44; font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 500; text-decoration: none; transition: background 0.3s ease;">Review</router-link>
                                </td>
                            </tr>
                            <tr v-if="completedRequests.length === 0">
                                <td colspan="5" style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0; text-align: center;">No completed requests.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- Footer Credit -->
            <p style="font-size: 0.8rem; color: #A0AEC0; text-align: center; margin-top: 3rem;">Created by Thakur Harsh Pratap Singh</p>
        </div>
    </div>
    `
};