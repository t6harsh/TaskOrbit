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
          max-width: 420px; 
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
              Create Account
            </h2>

            <p style="color: #d9534f; text-align: center; font-size: 0.95rem; margin-bottom: 1.5rem; font-weight: 500;" v-if="message">
              {{ message }}
            </p>

            <div style="margin-bottom: 1.5rem;">
                <label for="name" style="font-size: 0.9rem; font-weight: 500; color: #4A5568; display: block; margin-bottom: 0.5rem;">
                  Full Name
                </label>
                <input type="text" id="name" v-model.trim="formData.name" placeholder="Enter your full name" required 
                  style="
                    width: 100%; 
                    padding: 0.85rem 1rem; 
                    border-radius: 10px; 
                    border: 1px solid #CBD5E0; 
                    background: #fff; 
                    color: #2D3748; 
                    font-family: 'Inter', sans-serif; 
                    font-size: 1rem; 
                    outline: none; 
                    transition: all 0.3s ease;
                  "
                  onfocus="this.style.borderColor='#F4A261'; this.style.boxShadow='0 0 0 3px rgba(244,162,97,0.2)';"
                  onblur="this.style.borderColor='#CBD5E0'; this.style.boxShadow='none';">
            </div>

            <div style="margin-bottom: 1.5rem;">
                <label for="email" style="font-size: 0.9rem; font-weight: 500; color: #4A5568; display: block; margin-bottom: 0.5rem;">
                  Email address
                </label>
                <input type="email" id="email" v-model.trim="formData.email" placeholder="you@example.com" required 
                  style="
                    width: 100%; 
                    padding: 0.85rem 1rem; 
                    border-radius: 10px; 
                    border: 1px solid #CBD5E0; 
                    background: #fff; 
                    color: #2D3748; 
                    font-family: 'Inter', sans-serif; 
                    font-size: 1rem; 
                    outline: none; 
                    transition: all 0.3s ease;
                  "
                  onfocus="this.style.borderColor='#F4A261'; this.style.boxShadow='0 0 0 3px rgba(244,162,97,0.2)';"
                  onblur="this.style.borderColor='#CBD5E0'; this.style.boxShadow='none';">
            </div>

            <div style="margin-bottom: 2rem;">
                <label for="password" style="font-size: 0.9rem; font-weight: 500; color: #4A5568; display: block; margin-bottom: 0.5rem;">
                  Password
                </label>
                <input type="password" id="password" v-model.trim="formData.password" required 
                  style="
                    width: 100%; 
                    padding: 0.85rem 1rem; 
                    border-radius: 10px; 
                    border: 1px solid #CBD5E0; 
                    background: #fff; 
                    color: #2D3748; 
                    font-family: 'Inter', sans-serif; 
                    font-size: 1rem; 
                    outline: none; 
                    transition: all 0.3s ease;
                  "
                  onfocus="this.style.borderColor='#F4A261'; this.style.boxShadow='0 0 0 3px rgba(244,162,97,0.2)';"
                  onblur="this.style.borderColor='#CBD5E0'; this.style.boxShadow='none';">
            </div>

            <div style="text-align: center;">
                <button @click="registerCustomer" :disabled="!formData.name || !formData.email || !formData.password" 
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
                  :style="{ opacity: !formData.name || !formData.email || !formData.password ? 0.6 : 1, cursor: !formData.name || !formData.email || !formData.password ? 'not-allowed' : 'pointer' }"
                  onmouseover="if (!this.disabled) { this.style.transform='scale(1.05)'; }"
                  onmouseout="if (!this.disabled) { this.style.transform='scale(1)'; }">
                  Register
                </button>
            </div>
            <p style="font-size: 0.8rem; color: #718096; text-align: center; margin-top: 2rem;">
              Created by Thakur Harsh Pratap Singh
            </p>
        </div>
    </div>`,
    
    data() {
        return {
            formData: {
                name: "",
                email: "",
                password: ""
            },
            message: ""
        };
    },

    methods: {
        registerCustomer() {
            if (!this.formData.name || !this.formData.email || !this.formData.password) {
                this.message = "All fields are required!";
                return;
            }

            fetch('/api/register_customer', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.message = data.message;
                if (data.success) { // Assuming your API returns a success flag
                    // Optionally clear form or redirect
                    this.formData.name = "";
                    this.formData.email = "";
                    this.formData.password = "";
                    setTimeout(() => this.$router.push('/login'), 2000);
                }
            })
            .catch(error => {
                console.error("Registration error:", error);
                this.message = "An error occurred. Please try again.";
            });
        }
    }
}
