export default {
    data() {
        return {
            serviceRequestId: null,
            rating: "", // Initialize as empty string for the placeholder
            reviewDescription: '',
            message: '',
            isSuccess: false
        };
    },
    methods: {
        async submitReview() {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                this.message = "Unauthorized! Please log in.";
                this.isSuccess = false;
                return;
            }

            if (!this.rating || !this.reviewDescription) {
                this.message = "Please provide a rating and a review.";
                this.isSuccess = false;
                return;
            }

            try {
                const response = await fetch('/api/customer/rate_service', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({
                        service_request_id: this.serviceRequestId,
                        rating: parseInt(this.rating, 10),
                        review: this.reviewDescription
                    })
                });

                const data = await response.json();
                if (response.ok) {
                    this.message = "Review submitted successfully! Thank you.";
                    this.isSuccess = true;
                    this.resetForm();
                     setTimeout(() => this.$router.push('/customer'), 2000);
                } else {
                    this.message = data.message || "Failed to submit review.";
                    this.isSuccess = false;
                }
            } catch (error) {
                console.error("Error submitting review:", error);
                this.message = "An error occurred while submitting your review.";
                this.isSuccess = false;
            }
        },
        resetForm() {
            this.rating = "";
            this.reviewDescription = '';
        }
    },
    mounted() {
        this.serviceRequestId = this.$route.params.id;
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
                  Rate Service
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

                <form @submit.prevent="submitReview">
                    <div style="margin-bottom: 1.5rem;">
                        <label for="rating" style="font-size: 0.9rem; font-weight: 500; color: #4A5568; display: block; margin-bottom: 0.5rem;">Rating</label>
                        <select v-model="rating" id="rating" required 
                          style="width: 100%; padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid #CBD5E0; background: #fff; color: #2D3748; font-size: 1rem; outline: none; transition: all 0.3s ease; -webkit-appearance: none; appearance: none; background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234A5568%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E'); background-repeat: no-repeat; background-position: right 1rem center; background-size: .65em auto;"
                          onfocus="this.style.borderColor='#F4A261'; this.style.boxShadow='0 0 0 3px rgba(244,162,97,0.2)';"
                          onblur="this.style.borderColor='#CBD5E0'; this.style.boxShadow='none';">
                            <option value="" disabled>Select a rating (1-5)</option>
                            <option v-for="n in 5" :key="n" :value="n">{{ n }} Star{{ n > 1 ? 's' : '' }}</option>
                        </select>
                    </div>
                    <div style="margin-bottom: 2rem;">
                        <label for="review" style="font-size: 0.9rem; font-weight: 500; color: #4A5568; display: block; margin-bottom: 0.5rem;">Review</label>
                        <textarea v-model="reviewDescription" id="review" required placeholder="Tell us about your experience..."
                          style="width: 100%; padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid #CBD5E0; background: #fff; color: #2D3748; font-size: 1rem; outline: none; transition: all 0.3s ease; min-height: 120px; resize: vertical;"></textarea>
                    </div>
                    <div style="display: flex; gap: 1rem;">
                        <button type="submit" 
                          style="flex: 2; padding: 0.9rem; border-radius: 12px; background: linear-gradient(135deg, #F4A261, #FFB677); color: #fff; font-size: 1.1rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 6px 20px rgba(244,162,97,0.4);">
                          Submit Review
                        </button>
                        <router-link to="/customer" 
                          style="flex: 1; padding: 0.9rem; border-radius: 12px; background: #EDF2F7; color: #4A5568; font-size: 1.1rem; font-weight: 600; text-align: center; text-decoration: none; transition: background 0.3s ease;">
                          Cancel
                        </router-link>
                    </div>
                </form>
                <p style="font-size: 0.8rem; color: #718096; text-align: center; margin-top: 2rem;">Created by Thakur Harsh Pratap Singh</p>
            </div>
        </div>
    `
};
