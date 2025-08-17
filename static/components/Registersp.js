export default {
    template: `
    <div style="
      min-height: 100vh; 
      background: linear-gradient(135deg, #f8f9fc 0%, #e8ecf5 100%); 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      padding: 2rem; 
      font-family: 'Inter', sans-serif;
    ">
        <div style="
          max-width: 450px; 
          width: 100%;
          padding: 2.5rem; 
          background: rgba(255, 255, 255, 0.6); 
          backdrop-filter: blur(12px); 
          border-radius: 18px; 
          box-shadow: 0 8px 25px rgba(0,0,0,0.1); 
          border: 1px solid rgba(255, 255, 255, 0.8);
          transition: transform 0.4s ease;
        "
        onmouseover="this.style.transform='translateY(-6px)'" 
        onmouseout="this.style.transform='translateY(0)'">

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
              Join as a Professional
            </h2>

            <p style="color: #d9534f; text-align: center; font-size: 0.95rem; margin-bottom: 1.5rem; font-weight: 500;" v-if="message">{{ message }}</p>
            <p style="color: #28a745; text-align: center; font-size: 0.95rem; margin-bottom: 1.5rem; font-weight: 500;" v-if="successMessage">{{ successMessage }}</p>

            <div style="margin-bottom: 1.5rem;">
                <label for="name" style="font-size: 0.9rem; font-weight: 500; color: #4A5568; display: block; margin-bottom: 0.5rem;">Full Name</label>
                <input type="text" id="name" v-model="formData.name" required 
                  style="width: 100%; padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid #CBD5E0; background: #fff; color: #2D3748; font-size: 1rem; outline: none; transition: all 0.3s ease;"
                  onfocus="this.style.borderColor='#F4A261'; this.style.boxShadow='0 0 0 3px rgba(244,162,97,0.2)';"
                  onblur="this.style.borderColor='#CBD5E0'; this.style.boxShadow='none';">
            </div>
            <div style="margin-bottom: 1.5rem;">
                <label for="email" style="font-size: 0.9rem; font-weight: 500; color: #4A5568; display: block; margin-bottom: 0.5rem;">Email address</label>
                <input type="email" id="email" v-model="formData.email" placeholder="name@example.com" required 
                  style="width: 100%; padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid #CBD5E0; background: #fff; color: #2D3748; font-size: 1rem; outline: none; transition: all 0.3s ease;"
                  onfocus="this.style.borderColor='#F4A261'; this.style.boxShadow='0 0 0 3px rgba(244,162,97,0.2)';"
                  onblur="this.style.borderColor='#CBD5E0'; this.style.boxShadow='none';">
            </div>
            <div style="margin-bottom: 1.5rem;">
                <label for="password" style="font-size: 0.9rem; font-weight: 500; color: #4A5568; display: block; margin-bottom: 0.5rem;">Password</label>
                <input type="password" id="password" v-model="formData.password" required 
                  style="width: 100%; padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid #CBD5E0; background: #fff; color: #2D3748; font-size: 1rem; outline: none; transition: all 0.3s ease;"
                  onfocus="this.style.borderColor='#F4A261'; this.style.boxShadow='0 0 0 3px rgba(244,162,97,0.2)';"
                  onblur="this.style.borderColor='#CBD5E0'; this.style.boxShadow='none';">
            </div>
            <div style="margin-bottom: 1.5rem;">
                <label for="experience" style="font-size: 0.9rem; font-weight: 500; color: #4A5568; display: block; margin-bottom: 0.5rem;">Experience (Years)</label>
                <input type="number" id="experience" v-model="formData.service_provider_experience" required 
                  style="width: 100%; padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid #CBD5E0; background: #fff; color: #2D3748; font-size: 1rem; outline: none; transition: all 0.3s ease;"
                  onfocus="this.style.borderColor='#F4A261'; this.style.boxShadow='0 0 0 3px rgba(244,162,97,0.2)';"
                  onblur="this.style.borderColor='#CBD5E0'; this.style.boxShadow='none';">
            </div>
            <div style="margin-bottom: 2rem;">
                <label for="service" style="font-size: 0.9rem; font-weight: 500; color: #4A5568; display: block; margin-bottom: 0.5rem;">Select Service</label>
                <select id="service" v-model="formData.service_name" required 
                  style="width: 100%; padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid #CBD5E0; background: #fff; color: #2D3748; font-size: 1rem; outline: none; transition: all 0.3s ease; -webkit-appearance: none; appearance: none; background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234A5568%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E'); background-repeat: no-repeat; background-position: right 1rem center; background-size: .65em auto;">
                    <option value="" disabled selected>Please select a service</option>
                    <option v-for="service in services" :key="service.id" :value="service.name">
                        {{ service.name }}
                    </option>
                </select>
            </div>
            <div style="text-align: center;">
                <button @click="registerServiceProfessional" :disabled="!formData.email || !formData.password || !formData.name || !formData.service_provider_experience || !formData.service_name" 
                  style="
                    width: 100%; 
                    padding: 0.9rem 2.5rem; 
                    border-radius: 12px; 
                    background: linear-gradient(135deg, #F4A261, #FFB677); 
                    color: #fff; 
                    font-family: 'Inter', sans-serif; 
                    font-size: 1.1rem; 
                    font-weight: 600; 
                    border: none; 
                    cursor: pointer; 
                    transition: all 0.3s ease-in-out;
                    box-shadow: 0 6px 20px rgba(244,162,97,0.4);
                  "
                  :style="{ opacity: !formData.email || !formData.password || !formData.name || !formData.service_provider_experience || !formData.service_name ? 0.6 : 1, cursor: !formData.email || !formData.password || !formData.name || !formData.service_provider_experience || !formData.service_name ? 'not-allowed' : 'pointer' }"
                  onmouseover="if (!this.disabled) { this.style.transform='scale(1.05)'; }"
                  onmouseout="if (!this.disabled) { this.style.transform='scale(1)'; }">
                  Register
                </button>
            </div>
            <p style="font-size: 0.8rem; color: #718096; text-align: center; margin-top: 2rem;">Created by Thakur Harsh Pratap Singh</p>
        </div>
    </div>`,

    data() {
        return {
            formData: {
                name: "",
                email: "",
                password: "",
                service_provider_experience: "",
                service_name: "" 
            },
            services: [],
            message: "",
            successMessage: ""
        };
    },

    mounted() {
        this.getServices();
    },

    methods: {
        async getServices() {
            try {
                const response = await fetch('/api/get_unassigned_services');
                if (!response.ok) throw new Error('Failed to fetch services');
                this.services = await response.json();
            } catch (error) {
                console.error("Error fetching services:", error);
                this.message = "Failed to load available services.";
            }
        },

        async registerServiceProfessional() {
            try {
                const response = await fetch('/api/register_service_professional', {
                    method: 'POST',
                    headers: { "Content-Type": 'application/json' },
                    body: JSON.stringify(this.formData)
                });

                const data = await response.json();
                if (response.ok) {
                    this.successMessage = "Registration successful! Redirecting to login...";
                    this.message = "";
                    // Clear form
                    this.formData.name = "";
                    this.formData.email = "";
                    this.formData.password = "";
                    this.formData.service_provider_experience = "";
                    this.formData.service_name = "";
                    setTimeout(() => this.$router.push('/login'), 2000);
                } else {
                    this.message = data.message || "An unknown error occurred.";
                    this.successMessage = "";
                }
            } catch (error) {
                console.error("Registration error:", error);
                this.message = "An error occurred. Please try again.";
                this.successMessage = "";
            }
        }
    }
}
