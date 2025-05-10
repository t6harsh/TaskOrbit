export default {
    data() {
        return {
            service: {
                name: '',
                base_price: '',
                description: ''
            },
            message: ''
        };
    },
    methods: {
        async submitService() {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                this.message = "Unauthorized! Please log in.";
                return;
            }
            try {
                const response = await fetch('/api/service_create', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify(this.service)
                });
                const data = await response.json();
                if (response.ok) {
                    this.message = "Service created successfully!";
                    this.resetForm();
                } else {
                    this.message = data.message || "Failed to create service.";
                }
            } catch (error) {
                console.error("Error creating service:", error);
                this.message = "Error creating service.";
            }
        },
        resetForm() {
            this.service.name = '';
            this.service.base_price = '';
            this.service.description = '';
        }
    },
    template: `
        <div style="min-height: 100vh; background: linear-gradient(135deg, #1A2A44 0%, #2A3B5A 100%); display: flex; justify-content: center; align-items: center; padding: 2rem; font-family: 'Inter', sans-serif;">
            <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); padding: 2.5rem; border-radius: 12px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); max-width: 500px; width: 100%; border: 1px solid rgba(255, 255, 255, 0.2);">
                <h2 style="font-family: 'Poppins', sans-serif; font-size: 2rem; font-weight: 600; color: #F4A261; text-align: center; margin-bottom: 1.5rem;">Create New Service</h2>
                <div v-if="message" style="background: rgba(255, 191, 0, 0.1); color: #FFB700; padding: 1rem; border-radius: 8px; text-align: center; margin-bottom: 1.5rem;">{{ message }}</div>
                <form @submit.prevent="submitService">
                    <div style="margin-bottom: 1.5rem;">
                        <label for="name" style="font-size: 0.9rem; color: #A0AEC0; display: block; margin-bottom: 0.5rem;">Service Name</label>
                        <input type="text" v-model="service.name" id="name" required style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid #A0AEC0; background: rgba(255, 255, 255, 0.05); color: #FFFFFF; font-family: 'Inter', sans-serif; font-size: 1rem; outline: none; transition: border-color 0.3s ease;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label for="base_price" style="font-size: 0.9rem; color: #A0AEC0; display: block; margin-bottom: 0.5rem;">Base Price</label>
                        <input type="number" v-model="service.base_price" id="base_price" required style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid #A0AEC0; background: rgba(255, 255, 255, 0.05); color: #FFFFFF; font-family: 'Inter', sans-serif; font-size: 1rem; outline: none; transition: border-color 0.3s ease;">
                    </div>
                    <div style="margin-bottom: 2rem;">
                        <label for="description" style="font-size: 0.9rem; color: #A0AEC0; display: block; margin-bottom: 0.5rem;">Description</label>
                        <textarea v-model="service.description" id="description" required style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid #A0AEC0; background: rgba(255, 255, 255, 0.05); color: #FFFFFF; font-family: 'Inter', sans-serif; font-size: 1rem; outline: none; transition: border-color 0.3s ease; min-height: 120px; resize: vertical;"></textarea>
                    </div>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button type="submit" style="flex: 1; padding: 0.75rem; border-radius: 8px; background: #F4A261; color: #1A2A44; font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 500; border: none; cursor: pointer; transition: background 0.3s ease;">Create Service</button>
                        <router-link to="/admin" style="flex: 1; padding: 0.75rem; border-radius: 8px; background: #2A3B5A; color: #A0AEC0; font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 500; text-align: center; text-decoration: none; transition: background 0.3s ease;">Cancel</router-link>
                    </div>
                </form>
                <p style="font-size: 0.8rem; color: #A0AEC0; text-align: center; margin-top: 1.5rem;">Created by Thakur Harsh Pratap Singh</p>
            </div>
        </div>
    `
};