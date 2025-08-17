export default {
    template: `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #f8f9fc 0%, #e8ecf5 100%); display: flex; justify-content: center; align-items: flex-start; padding: 2rem; font-family: 'Inter', sans-serif; color: #2D3748;">
        <div style="
          max-width: 800px; 
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
              Search Professionals
            </h2>

            <!-- Search Input -->
            <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                <input type="text" v-model="searchQuery" @keyup.enter="fetchUsers" placeholder="Enter professional's name..." 
                  style="flex: 1; padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid #CBD5E0; background: #fff; color: #2D3748; font-size: 1rem; outline: none; transition: all 0.3s ease;"
                  onfocus="this.style.borderColor='#F4A261'; this.style.boxShadow='0 0 0 3px rgba(244,162,97,0.2)';"
                  onblur="this.style.borderColor='#CBD5E0'; this.style.boxShadow='none';">
                <button @click="fetchUsers" 
                  style="padding: 0.85rem 1.5rem; border-radius: 10px; background: linear-gradient(135deg, #F4A261, #FFB677); color: #fff; font-size: 1rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(244,162,97,0.4);">
                  Search
                </button>
            </div>

            <!-- Display Search Results -->
            <div v-if="message" style="background-color: #f0f4ff; color: #4A5568; padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid #a3bffa;">
              {{ message }}
            </div>
            <div v-else-if="users.length > 0" style="overflow-x: auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f7fafc; color: #4A5568;">
                            <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">ID</th>
                            <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Name</th>
                            <th style="padding: 1rem 1.5rem; font-size: 0.9rem; text-align: left; font-weight: 600;">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id" style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ user.id }}</td>
                            <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ user.name }}</td>
                            <td style="padding: 1rem 1.5rem; font-size: 0.9rem;">{{ user.email }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div style="text-align: center; margin-top: 2rem;">
                 <router-link to="/admin" 
                      style="padding: 0.8rem 1.5rem; border-radius: 10px; background: #EDF2F7; color: #4A5568; font-weight: 600; text-decoration: none; transition: all 0.3s ease;">
                      Back to Admin
                 </router-link>
            </div>

            <p style="font-size: 0.8rem; color: #718096; text-align: center; margin-top: 3rem;">Created by Thakur Harsh Pratap Singh</p>
        </div>
    </div>`,

    data() {
        return {
            searchQuery: "",
            users: [],
            message: "Enter a name to search for professionals."
        };
    },

    methods: {
        async fetchUsers() {
            if (!this.searchQuery.trim()) {
                this.message = "Please enter a user name to search.";
                this.users = [];
                return;
            }
            try {
                const response = await fetch(`/api/search_professional?query=${encodeURIComponent(this.searchQuery)}`);
                const data = await response.json();
                if (response.ok && data.users && data.users.length > 0) {
                    this.users = data.users;
                    this.message = "";
                } else {
                    this.users = [];
                    this.message = data.message || "No professionals found matching your search.";
                }
            } catch (error) {
                console.error("Error fetching professionals:", error);
                this.users = [];
                this.message = "An error occurred while searching. Please try again.";
            }
        }
    }
};
