export default {
    template: `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #f8f9fc 0%, #e8ecf5 100%); display: flex; justify-content: center; align-items: flex-start; padding: 2rem; font-family: 'Inter', sans-serif; color: #2D3748;">
        <div style="
          max-width: 1000px; 
          width: 100%;
          margin-top: 2rem;
          padding: 2.5rem; 
          background: rgba(255, 255, 255, 0.6); 
          backdrop-filter: blur(12px); 
          border-radius: 18px; 
          box-shadow: 0 8px 25px rgba(0,0,0,0.1); 
          border: 1px solid rgba(255, 255, 255, 0.8);
        ">
            <h2 style="
              font-family: 'Poppins', sans-serif; 
              font-size: 2.5rem; 
              font-weight: 700; 
              text-align: center; 
              margin-bottom: 2rem;
              background: linear-gradient(90deg, #FF7E5F, #F4A261); 
              -webkit-background-clip: text; 
              -webkit-text-fill-color: transparent; 
            ">
              Search Services
            </h2>

            <!-- Search Input -->
            <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                <input type="text" v-model="searchQuery" @keyup.enter="fetchServices" placeholder="Enter service name..." 
                  style="flex: 1; padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid #CBD5E0; background: #fff; color: #2D3748; font-size: 1rem; outline: none; transition: all 0.3s ease;"
                  onfocus="this.style.borderColor='#F4A261'; this.style.boxShadow='0 0 0 3px rgba(244,162,97,0.2)';"
                  onblur="this.style.borderColor='#CBD5E0'; this.style.boxShadow='none';">
                <button @click="fetchServices" 
                  style="padding: 0.85rem 1.5rem; border-radius: 10px; background: linear-gradient(135deg, #F4A261, #FFB677); color: #fff; font-size: 1rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(244,162,97,0.4);">
                  Search
                </button>
            </div>

            <!-- Display Search Results -->
            <div v-if="message" style="background-color: #f0f4ff; color: #4A5568; padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid #a3bffa;">
              {{ message }}
            </div>
            <div v-else-if="services.length > 0" style="overflow-x: auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
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
                        <tr v-for="service in services" :key="service.id" style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ service.name }}</td>
                            <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ service.user_name }}</td>
                            <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">₹{{ service.base_price }}</td>
                            <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ service.description }}</td>
                            <td style="padding: 1rem 1.5rem; text-align: center;">
                                <button @click="requestService(service.id, service.user_id)" 
                                  style="padding: 0.6rem 1.2rem; border-radius: 8px; background: linear-gradient(135deg, #F4A261, #FFB677); color: #fff; font-weight: 600; border: none; cursor: pointer;">
                                  Request
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div style="text-align: center; margin-top: 2rem;">
                 <router-link to="/customer" 
                      style="padding: 0.8rem 1.5rem; border-radius: 10px; background: #EDF2F7; color: #4A5568; font-weight: 600; text-decoration: none; transition: all 0.3s ease;">
                      Back to Dashboard
                 </router-link>
            </div>

            <p style="font-size: 0.8rem; color: #718096; text-align: center; margin-top: 3rem;">Created by Thakur Harsh Pratap Singh</p>
        </div>
    </div>`,

    data() {
        return {
            searchQuery: "",
            services: [],
            message: "Enter a service name to begin your search."
        };
    },

    methods: {
        async fetchServices() {
            if (!this.searchQuery.trim()) {
                this.message = "Please enter a service name.";
                this.services = [];
                return;
            }
            try {
                const response = await fetch(`/api/search_services?query=${encodeURIComponent(this.searchQuery)}`);
                const data = await response.json();
                if (response.ok && data.services && data.services.length > 0) {
                    this.services = data.services;
                    this.message = "";
                } else {
                    this.services = [];
                    this.message = data.message || "No services found matching your search.";
                }
            } catch (error) {
                console.error("Error fetching services:", error);
                this.services = [];
                this.message = "An error occurred while searching. Please try again.";
            }
        },
        async requestService(serviceId, serviceProviderId) {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                this.message = "Unauthorized! Please log in to request a service.";
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
                    this.message = "Service requested successfully!";
                } else {
                    this.message = result.message || "Failed to create service request.";
                }
            } catch (error) {
                console.error("Error requesting service:", error);
                this.message = "Error requesting service. Please try again.";
            }
        }
    }
};
