export default {
    props: ['loggedIn'],
    template: `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #1A2A44 0%, #2A3B5A 100%); display: flex; justify-content: center; align-items: center; padding: 2rem; font-family: 'Inter', sans-serif;">
        <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); padding: 2.5rem; border-radius: 12px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); max-width: 400px; width: 100%; border: 1px solid rgba(255, 255, 255, 0.2);">
            <h2 style="font-family: 'Poppins', sans-serif; font-size: 2rem; font-weight: 600; color: #F4A261; text-align: center; margin-bottom: 1.5rem;">Login to TaskOrbit</h2>
            <p style="color: #FF6B6B; text-align: center; font-size: 0.9rem; margin-bottom: 1.5rem;" v-if="message">{{ message }}</p>
            <div style="margin-bottom: 1.5rem;">
                <label for="email" style="font-size: 0.9rem; color: #A0AEC0; display: block; margin-bottom: 0.5rem;">Email address</label>
                <input type="email" id="email" v-model="formData.email" placeholder="name@example.com" required style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid #A0AEC0; background: rgba(255, 255, 255, 0.05); color: #FFFFFF; font-family: 'Inter', sans-serif; font-size: 1rem; outline: none; transition: border-color 0.3s ease;">
            </div>
            <div style="margin-bottom: 2rem;">
                <label for="password" style="font-size: 0.9rem; color: #A0AEC0; display: block; margin-bottom: 0.5rem;">Password</label>
                <input type="password" id="password" v-model="formData.password" required style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid #A0AEC0; background: rgba(255, 255, 255, 0.05); color: #FFFFFF; font-family: 'Inter', sans-serif; font-size: 1rem; outline: none; transition: border-color 0.3s ease;">
            </div>
            <div style="text-align: center;">
                <button @click="loginUser" :disabled="!formData.email || !formData.password" style="width: 100%; padding: 0.75rem; border-radius: 8px; background: #F4A261; color: #1A2A44; font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 500; border: none; cursor: pointer; transition: background 0.3s ease; opacity: !formData.email || !formData.password ? 0.6 : 1;">Login</button>
            </div>
            <p style="font-size: 0.8rem; color: #A0AEC0; text-align: center; margin-top: 1.5rem;">Created by Thakur Harsh Pratap Singh</p>
        </div>
    </div>`,
    
    data() {
        return {
            formData: {
                email: "",
                password: ""
            },
            message: ""
        };
    },

    methods: {
        loginUser() {
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.formData)
            })
            .then(response => response.json())
            .then(data => { 
                console.log(data);
                if (data.user && data.user["auth-token"]) {  
                    localStorage.setItem("auth_token", data.user["auth-token"]); 
                    localStorage.setItem("id", data.user.id);
                    localStorage.setItem("username", data.user.name);
                    this.$emit('login');
    
                    if (data.user.role === 'admin') {
                        this.$router.push('/admin');
                    } else if (data.user.role === 'customer') {
                        this.$router.push('/customer');
                    } else if (data.user.role === 'service_professional') {
                        this.$router.push('/professional');
                    } else {
                        this.message = "Invalid role assigned. Contact support.";
                    }
                } else {
                    this.message = data.message
                }
            })
            .catch(error => {
                console.error("Login error:", error);
                this.message = "An error occurred. Please try again.";
            });
        }
    }
}