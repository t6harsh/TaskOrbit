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
                // Fetch Username
                const userResponse = await fetch('/api/customer', {
                    headers: { "Authorization": token }
                });
                const userData = await userResponse.json();
                if (userResponse.ok) this.username = userData.username;
                else this.message = userData.message || "Failed to fetch user data.";

                // Fetch Available Services
                const servicesResponse = await fetch('/api/customer/service', {
                    headers: { "Authorization": token }
                });
                const servicesData = await servicesResponse.json();
                if (servicesResponse.ok) this.availableServices = servicesData.service_requests || [];
                else this.message = servicesData.message || "Failed to fetch services.";

                // Fetch In-Progress Requests
                const progressResponse = await fetch('/api/customer/in_progress_requests', {
                    headers: { "Authorization": token }
                });
                const progressData = await progressResponse.json();
                if (progressResponse.ok) this.inProgressRequests = progressData.in_progress_requests || [];
                else this.message = progressData.message || "Failed to fetch in-progress requests.";

                // Fetch Completed Requests
                const completedResponse = await fetch('/api/customer/completed_requests', {
                    headers: { "Authorization": token }
                });
                const completedData = await completedResponse.json();
                if (completedResponse.ok) this.completedRequests = completedData.completed_requests || [];
                else this.message = completedData.message || "Failed to fetch completed requests.";

            } catch (error) {
                console.error("Error fetching data:", error);
                this.message = "Error fetching data. Please try again.";
            }
        },
        async completeServiceRequest(requestId) {
            const token = localStorage.getItem("auth_token");
            if (!token) { this.message = "Unauthorized!"; return; }
            try {
                const response = await fetch(`/api/customer/complete_service_request/${requestId}`, {
                    method: 'PUT',
                    headers: { "Authorization": token }
                });
                const result = await response.json();
                if (response.ok) {
                    this.message = "Service request marked as complete!";
                    this.fetchCustomerData(); // Refresh all data
                } else {
                    this.message = result.message || "Failed to complete service request.";
                }
            } catch (error) {
                this.message = "Error completing service request. Please try again.";
            }
        },
        async requestService(serviceId, serviceProviderId) {
            const token = localStorage.getItem("auth_token");
            if (!token) { this.message = "Unauthorized!"; return; }
            try {
                const response = await fetch('/api/customer/create_service_request', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json", "Authorization": token },
                    body: JSON.stringify({
                        service_id: serviceId,
                        service_provider_id: serviceProviderId
                    })
                });
                const result = await response.json();
                if (response.ok) {
                    this.message = "Service requested successfully!";
                    this.fetchCustomerData(); // Refresh all data
                } else {
                    this.message = result.message || "Failed to create service request.";
                }
            } catch (error) {
                this.message = "Error requesting service. Please try again.";
            }
        }
    },
    mounted() {
        this.fetchCustomerData();
    },
    template: `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #f8f9fc 0%, #e8ecf5 100%); padding: 2rem; font-family: 'Inter', sans-serif; color: #2D3748;">
        <div style="
          max-width: 1200px; 
          margin: 0 auto; 
          padding: 2.5rem; 
          background: rgba(255, 255, 255, 0.6); 
          backdrop-filter: blur(12px); 
          border-radius: 18px; 
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        ">
            <h2 style="
              font-family: 'Poppins', sans-serif; 
              font-size: 2.5rem; 
              font-weight: 700; 
              text-align: center; 
              margin-bottom: 2.5rem;
              background: linear-gradient(90deg, #FF7E5F, #F4A261); 
              -webkit-background-clip: text; 
              -webkit-text-fill-color: transparent; 
            ">
              Welcome, {{ username }}!
            </h2>

            <div v-if="message" style="background-color: #FFF5F5; color: #C53030; padding: 1rem; border-radius: 8px; text-align: center; margin-bottom: 2rem; border: 1px solid #FC8181;">
              {{ message }}
            </div>

            <!-- Available Services -->
            <div style="margin-bottom: 3rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 2px solid #F4A261; padding-bottom: 0.5rem;">
                    <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.8rem; font-weight: 600; color: #2D3748;">Available Services</h3>
                    <router-link to="/searchservice" style="padding: 0.6rem 1.2rem; border-radius: 10px; background: #EDF2F7; color: #4A5568; font-weight: 600; text-decoration: none; transition: all 0.3s ease;">Search Services</router-link>
                </div>
                <div style="overflow-x: auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f7fafc; color: #4A5568;">
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Service</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Provider</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Price</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Description</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: center; font-weight: 600;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="service in availableServices" :key="service.id" style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem; color: #4A5568;">{{ service.name }}</td>
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem; color: #4A5568;">{{ service.user_name }}</td>
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem; color: #4A5568;">₹{{ service.base_price }}</td>
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem; color: #4A5568;">{{ service.description }}</td>
                                <td style="padding: 1rem 1.5rem; text-align: center;">
                                    <button @click="requestService(service.id, service.service_provider_id)" style="padding: 0.6rem 1.2rem; border-radius: 8px; background: linear-gradient(135deg, #F4A261, #FFB677); color: #fff; font-weight: 600; border: none; cursor: pointer;">Request</button>
                                </td>
                            </tr>
                            <tr v-if="availableServices.length === 0">
                                <td colspan="5" style="padding: 2rem; font-size: 1rem; color: #718096; text-align: center;">No services currently available.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- In Progress Requests -->
            <div style="margin-bottom: 3rem;">
                <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.8rem; font-weight: 600; color: #2D3748; margin-bottom: 1.5rem; border-bottom: 2px solid #F4A261; padding-bottom: 0.5rem;">In Progress</h3>
                <div style="overflow-x: auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f7fafc; color: #4A5568;">
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Service</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Provider</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Status</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Date Requested</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: center; font-weight: 600;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="request in inProgressRequests" :key="request.id" style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ request.service_name }}</td>
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ request.service_provider_email }}</td>
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem; text-transform: capitalize;">{{ request.service_status }}</td>
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ new Date(request.date_of_register).toLocaleDateString() }}</td>
                                <td style="padding: 1rem 1.5rem; text-align: center;">
                                    <button v-if="request.service_status === 'accepted'" @click="completeServiceRequest(request.id)" style="padding: 0.6rem 1.2rem; border-radius: 8px; background: #38B2AC; color: #fff; font-weight: 600; border: none; cursor: pointer;">Mark as Complete</button>
                                </td>
                            </tr>
                            <tr v-if="inProgressRequests.length === 0">
                                <td colspan="5" style="padding: 2rem; font-size: 1rem; color: #718096; text-align: center;">You have no in-progress service requests.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Completed Requests -->
            <div>
                <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.8rem; font-weight: 600; color: #2D3748; margin-bottom: 1.5rem; border-bottom: 2px solid #F4A261; padding-bottom: 0.5rem;">History</h3>
                <div style="overflow-x: auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f7fafc; color: #4A5568;">
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Service</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Provider</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Status</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Completion Date</th>
                                <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: center; font-weight: 600;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="request in completedRequests" :key="request.id" style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ request.service_name }}</td>
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ request.service_provider_email }}</td>
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem; text-transform: capitalize;">{{ request.service_status }}</td>
                                <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ new Date(request.date_of_completion).toLocaleDateString() }}</td>
                                <td style="padding: 1rem 1.5rem; text-align: center;">
                                    <router-link :to="'/review/' + request.id" style="padding: 0.6rem 1.2rem; border-radius: 8px; background: #ECC94B; color: #2D3748; font-weight: 600; text-decoration: none;">Rate Service</router-link>
                                </td>
                            </tr>
                            <tr v-if="completedRequests.length === 0">
                                <td colspan="5" style="padding: 2rem; font-size: 1rem; color: #718096; text-align: center;">You have no completed service requests.</td>
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
