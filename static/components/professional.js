export default {
    data() {
        return {
            username: "",
            serviceRequests: [],
            reviews: [],
            message: "",
            reviewMessage: ""
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
                const userResponse = await fetch('/api/service_professional', {
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

                const requestsResponse = await fetch('/api/service_requests', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                const requestsData = await requestsResponse.json();
                if (requestsResponse.ok) {
                    this.serviceRequests = requestsData.service_requests || [];
                } else {
                    this.message = requestsData.message || "Failed to fetch service requests.";
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                this.message = "Error fetching user details. Please try again.";
            }
        },
        async updateServiceStatus(request, status) {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                this.message = "Unauthorized! Please log in.";
                return;
            }
            let endpoint = "";
            if (status === "accepted") {
                endpoint = `/api/professional/accept_service_request/${request.id}`;
            } else if (status === "rejected") {
                endpoint = `/api/professional/reject_service_request/${request.id}`;
            } else if (status === "completed") {
                endpoint = `/api/professional/complete_service_request/${request.id}`;
            } else {
                this.message = "Invalid status update.";
                return;
            }
            try {
                const response = await fetch(endpoint, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                const result = await response.json();
                if (response.ok) {
                    request.service_status = status;
                    this.message = `Service request ${status} successfully!`;
                } else {
                    this.message = result.message || `Failed to update status to ${status}.`;
                }
            } catch (error) {
                console.error("Error updating status:", error);
                this.message = "Error updating service request status. Please try again.";
            }
        },
        async fetchReviews() {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                this.reviewMessage = "Unauthorized! Please log in.";
                return;
            }
            try {
                const response = await fetch('/api/service_professional/reviews', {
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
                this.reviewMessage = "Error fetching reviews. Please try again.";
            }
        }
    },
    mounted() {
        this.fetchCustomerData();
        this.fetchReviews();
    },
    template: `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #1A2A44 0%, #2A3B5A 100%); padding: 2rem; font-family: 'Inter', sans-serif; color: #A0AEC0;">
        <div style="max-width: 1000px; margin: 0 auto;">
            <div v-if="message" style="background: rgba(255, 191, 0, 0.1); color: #FFB700; padding: 1rem; border-radius: 8px; text-align: center; margin-bottom: 1.5rem;">{{ message }}</div>
            <div v-else style="text-align: center;">
                <h2 style="font-family: 'Poppins', sans-serif; font-size: 2rem; font-weight: 600; color: #F4A261; margin-bottom: 1.5rem;">Hey, {{ username }}!</h2>
                <!-- All Service Requests -->
                <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.5rem; font-weight: 600; color: #F4A261; margin-bottom: 1.5rem;">All Service Requests</h3>
                <div style="overflow-x: auto; margin-bottom: 2rem;">
                    <table style="width: 100%; border-collapse: collapse; background: rgba(255, 255, 255, 0.1); border-radius: 8px;">
                        <thead>
                            <tr style="background: #2A3B5A; color: #FFFFFF;">
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">User Email</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Status</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Date Registered</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="request in serviceRequests" :key="request.id" style="border-bottom: 1px solid #2A3B5A;">
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ request.user_email }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ request.service_status }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ request.date_of_register }}</td>
                                <td style="padding: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                                    <button v-if="request.service_status === 'requested' || request.service_status === 'pending'" 
                                            @click="updateServiceStatus(request, 'accepted')" 
                                            style="padding: 0.5rem 1rem; border-radius: 8px; background: #4FD1C5; color: #1A2A44; font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 500; border: none; cursor: pointer; transition: background 0.3s ease;">Accept</button>
                                    <button v-if="request.service_status === 'requested' || request.service_status === 'pending'" 
                                            @click="updateServiceStatus(request, 'rejected')" 
                                            style="padding: 0.5rem 1rem; border-radius: 8px; background: #FF6B6B; color: #FFFFFF; font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 500; border: none; cursor: pointer; transition: background 0.3s ease;">Reject</button>
                                    <button v-if="request.service_status === 'rejected'" 
                                            disabled 
                                            style="padding: 0.5rem 1rem; border-radius: 8px; background: #2A3B5A; color: #A0AEC0; font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 500; border: none; opacity: 0.6;">Rejected</button>
                                    <button v-if="request.service_status === 'accepted'" 
                                            @click="updateServiceStatus(request, 'completed')" 
                                            style="padding: 0.5rem 1rem; border-radius: 8px; background: #F4A261; color: #1A2A44; font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 500; border: none; cursor: pointer; transition: background 0.3s ease;">Complete</button>
                                    <button v-if="request.service_status === 'completed'" 
                                            disabled 
                                            style="padding: 0.5rem 1rem; border-radius: 8px; background: #2A3B5A; color: #A0AEC0; font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 500; border: none; opacity: 0.6;">Completed</button>
                                </td>
                            </tr>
                            <tr v-if="serviceRequests.length === 0">
                                <td colspan="4" style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0; text-align: center;">No service requests available.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- All Reviews -->
                <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.5rem; font-weight: 600; color: #F4A261; margin-bottom: 1.5rem;">All Reviews</h3>
                <div v-if="reviewMessage" style="background: rgba(255, 191, 0, 0.1); color: #FFB700; padding: 1rem; border-radius: 8px; text-align: center; margin-bottom: 1.5rem;">{{ reviewMessage }}</div>
                <div v-else style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; background: rgba(255, 255, 255, 0.1); border-radius: 8px;">
                        <thead>
                            <tr style="background: #2A3B5A; color: #FFFFFF;">
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Customer Name</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Service Name</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Rating</th>
                                <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Review Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="review in reviews" :key="review.id" style="border-bottom: 1px solid #2A3B5A;">
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ review.customer_name }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ review.service_name }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ review.rating }}</td>
                                <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ review.review_description }}</td>
                            </tr>
                            <tr v-if="reviews.length === 0">
                                <td colspan="4" style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0; text-align: center;">No reviews available.</td>
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