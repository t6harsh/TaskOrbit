export default {
    data() {
        return {
            service: {
                id: null,
                name: '',
                base_price: '',
                description: ''
            },
            message: '',
            isSuccess: false
        };
    },
    methods: {
        async fetchService() {
            const token = localStorage.getItem("auth_token");
            const serviceId = this.$route.params.id;
            if (!token) {
                this.message = "Unauthorized! Please log in.";
                this.isSuccess = false;
                return;
            }
            try {
                const response = await fetch(`/api/service_get/${serviceId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    this.service = data;
                } else {
                    this.message = data.message || "Failed to fetch service details.";
                    this.isSuccess = false;
                }
            } catch (error) {
                console.error("Error fetching service:", error);
                this.message = "An error occurred while fetching service details.";
                this.isSuccess = false;
            }
        },
        async updateService() {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                this.message = "Unauthorized! Please log in.";
                this.isSuccess = false;
                return;
            }
            try {
                const response = await fetch(`/api/service_update/${this.service.id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify(this.service)
                });
                const data = await response.json();
                if (response.ok) {
                    this.message = "Service updated successfully!";
                    this.isSuccess = true;
                } else {
                    this.message = data.message || "Failed to update service.";
                    this.isSuccess = false;
                }
            } catch (error) {
                console.error("Error updating service:", error);
                this.message = "An error occurred while updating the service.";
                this.isSuccess = false;
            }
        }
    },
    mounted() {
        this.fetchService();
    },
    template: `
        <div style="min-height: 100vh; background: linear-gradient(135deg, #f8f9fc 0%, #e8ecf5 100%); display: flex; justify-content: center; align-items: center; padding: 2rem; font-family: 'Inter', sans-serif;">
            <div style="
              max-width: 500px; 
              width: 100%;
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
                  Edit Service
                </h2>
                
                <div v-if="message" :style="{ 
                  backgroundColor: isSuccess ? '#F0FFF4' : '#FFF5F5', 
                  color: isSuccess ? '#2F855A' : '#C53030', 
                  border: isSuccess ? '1px solid #68D391' : '1px solid #FC8181',
                  padding: '1rem', 
                  borderRadius: '8px', 
                  textAlign: 'center', 
                  marginBottom: '1.5rem',
                  fontWeight: '500'
                }">
                  {{ message }}
                </div>

                <form @submit.prevent="updateService">
                    <div style="margin-bottom: 1.5rem;">
                        <label for="name" style="font-size: 0.9rem; font-weight: 500; color: #4A5568; display: block; margin-bottom: 0.5rem;">Service Name</label>
                        <input type="text" v-model="service.name" id="name" required 
                          style="width: 100%; padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid #CBD5E0; background: #fff; color: #2D3748; font-size: 1rem; outline: none; transition: all 0.3s ease;"
                          onfocus="this.style.borderColor='#F4A261'; this.style.boxShadow='0 0 0 3px rgba(244,162,97,0.2)';"
                          onblur="this.style.borderColor='#CBD5E0'; this.style.boxShadow='none';">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label for="base_price" style="font-size: 0.9rem; font-weight: 500; color: #4A5568; display: block; margin-bottom: 0.5rem;">Base Price (₹)</label>
                        <input type="number" v-model="service.base_price" id="base_price" required 
                          style="width: 100%; padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid #CBD5E0; background: #fff; color: #2D3748; font-size: 1rem; outline: none; transition: all 0.3s ease;"
                          onfocus="this.style.borderColor='#F4A261'; this.style.boxShadow='0 0 0 3px rgba(244,162,97,0.2)';"
                          onblur="this.style.borderColor='#CBD5E0'; this.style.boxShadow='none';">
                    </div>
                    <div style="margin-bottom: 2rem;">
                        <label for="description" style="font-size: 0.9rem; font-weight: 500; color: #4A5568; display: block; margin-bottom: 0.5rem;">Description</label>
                        <textarea v-model="service.description" id="description" required 
                          style="width: 100%; padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid #CBD5E0; background: #fff; color: #2D3748; font-size: 1rem; outline: none; transition: all 0.3s ease; min-height: 120px; resize: vertical;"></textarea>
                    </div>
                    <div style="display: flex; gap: 1rem;">
                        <button type="submit" 
                          style="flex: 2; padding: 0.9rem; border-radius: 12px; background: linear-gradient(135deg, #F4A261, #FFB677); color: #fff; font-size: 1.1rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 6px 20px rgba(244,162,97,0.4);">
                          Update Service
                        </button>
                        <router-link to="/admin" 
                          style="flex: 1; padding: 0.9rem; border-radius: 12px; background: #EDF2F7; color: #4A5568; font-size: 1.1rem; font-weight: 600; text-align: center; text-decoration: none; transition: background 0.3s ease;">
                          Back to Admin
                        </router-link>
                    </div>
                </form>
                <p style="font-size: 0.8rem; color: #718096; text-align: center; margin-top: 2rem;">Created by Thakur Harsh Pratap Singh</p>
            </div>
        </div>
    `
};
