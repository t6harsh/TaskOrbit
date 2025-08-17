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
                    const originalRequest = this.serviceRequests.find(r => r.id === request.id);
                    if(originalRequest) {
                       originalRequest.service_status = status;
                    }
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
              Hey, {{ username }}!
            </h2>

            <div v-if="message" style="background-color: #FFF5F5; color: #C53030; padding: 1rem; border-radius: 8px; text-align: center; margin-bottom: 2rem; border: 1px solid #FC8181;">
              {{ message }}
            </div>

            <!-- All Service Requests -->
            <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.8rem; font-weight: 600; color: #2D3748; margin-bottom: 1.5rem; border-bottom: 2px solid #F4A261; padding-bottom: 0.5rem;">
              Service Requests
            </h3>
            <div style="overflow-x: auto; margin-bottom: 3rem; background: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f7fafc; color: #4A5568;">
                            <th style="padding: 1rem 1.5rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left; font-weight: 600;">User Email</th>
                            <th style="padding: 1rem 1.5rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left; font-weight: 600;">Status</th>
                            <th style="padding: 1rem 1.5rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left; font-weight: 600;">Date Registered</th>
                            <th style="padding: 1rem 1.5rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left; font-weight: 600;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="request in serviceRequests" :key="request.id" style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 1rem 1.5rem; font-size: 0.9rem; color: #4A5568;">{{ request.user_email }}</td>
                            <td style="padding: 1rem 1.5rem; font-size: 0.9rem; color: #4A5568; text-transform: capitalize;">{{ request.service_status }}</td>
                            <td style="padding: 1rem 1.5rem; font-size: 0.9rem; color: #4A5568;">{{ new Date(request.date_of_register).toLocaleDateString() }}</td>
                            <td style="padding: 1rem 1.5rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                                <button v-if="request.service_status === 'requested' || request.service_status === 'pending'" @click="updateServiceStatus(request, 'accepted')" style="padding: 0.5rem 1rem; border-radius: 8px; background: #38B2AC; color: #fff; font-weight: 500; border: none; cursor: pointer; transition: all 0.2s ease;">Accept</button>
                                <button v-if="request.service_status === 'requested' || request.service_status === 'pending'" @click="updateServiceStatus(request, 'rejected')" style="padding: 0.5rem 1rem; border-radius: 8px; background: #E53E3E; color: #fff; font-weight: 500; border: none; cursor: pointer; transition: all 0.2s ease;">Reject</button>
                                <button v-if="request.service_status === 'accepted'" @click="updateServiceStatus(request, 'completed')" style="padding: 0.5rem 1rem; border-radius: 8px; background: linear-gradient(135deg, #F4A261, #FFB677); color: #fff; font-weight: 500; border: none; cursor: pointer; transition: all 0.2s ease;">Complete</button>
                                <span v-if="request.service_status === 'rejected' || request.service_status === 'completed'" style="padding: 0.5rem 1rem; border-radius: 8px; background: #E2E8F0; color: #718096; font-size: 0.9rem; font-weight: 500; text-transform: capitalize;">{{ request.service_status }}</span>
                            </td>
                        </tr>
                        <tr v-if="serviceRequests.length === 0">
                            <td colspan="4" style="padding: 2rem; font-size: 1rem; color: #718096; text-align: center;">No service requests available.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- All Reviews -->
            <h3 style="font-family: 'Poppins', sans-serif; font-size: 1.8rem; font-weight: 600; color: #2D3748; margin-bottom: 1.5rem; border-bottom: 2px solid #F4A261; padding-bottom: 0.5rem;">
              Reviews
            </h3>
             <div v-if="reviewMessage" style="background-color: #f0f4ff; color: #4A5568; padding: 1rem; border-radius: 8px; text-align: center; margin-bottom: 1.5rem; border: 1px solid #a3bffa;">
               {{ reviewMessage }}
             </div>
            <div v-else style="overflow-x: auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f7fafc; color: #4A5568;">
                            <th style="padding: 1rem 1.5rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left; font-weight: 600;">Customer</th>
                            <th style="padding: 1rem 1.5rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left; font-weight: 600;">Service</th>
                            <th style="padding: 1rem 1.5rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left; font-weight: 600;">Rating</th>
                            <th style="padding: 1rem 1.5rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left; font-weight: 600;">Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="review in reviews" :key="review.id" style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 1rem 1.5rem; font-size: 0.9rem; color: #4A5568;">{{ review.customer_name }}</td>
                            <td style="padding: 1rem 1.5rem; font-size: 0.9rem; color: #4A5568;">{{ review.service_name }}</td>
                            <td style="padding: 1rem 1.5rem; font-size: 0.9rem; color: #4A5568;">{{ review.rating }} / 5</td>
                            <td style="padding: 1rem 1.5rem; font-size: 0.9rem; color: #4A5568;">{{ review.review_description }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <p style="font-size: 0.8rem; color: #718096; text-align: center; margin-top: 3rem;">
              Created by Thakur Harsh Pratap Singh
            </p>
        </div>
    </div>
    `
};
