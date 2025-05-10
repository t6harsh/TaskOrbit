export default {
    template: `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #1A2A44 0%, #2A3B5A 100%); padding: 2rem; font-family: 'Inter', sans-serif; color: #A0AEC0;">
        <div style="max-width: 800px; margin: 0 auto;">
            <h2 style="font-family: 'Poppins', sans-serif; font-size: 2rem; font-weight: 600; color: #F4A261; text-align: center; margin-bottom: 2rem;">Search Professionals</h2>
            <!-- Search Input -->
            <div style="display: flex; gap: 1rem; background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); padding: 1rem; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); margin-bottom: 2rem; border: 1px solid rgba(255, 255, 255, 0.2);">
                <input type="text" v-model="searchQuery" placeholder="Enter user name..." style="flex: 1; padding: 0.75rem; border-radius: 8px; border: 1px solid #A0AEC0; background: rgba(255, 255, 255, 0.05); color: #FFFFFF; font-family: 'Inter', sans-serif; font-size: 1rem; outline: none; transition: border-color 0.3s ease;">
                <button @click="fetchUsers" style="padding: 0.75rem 1.5rem; border-radius: 8px; background: #F4A261; color: #1A2A44; font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 500; border: none; cursor: pointer; transition: background 0.3s ease;">Search</button>
            </div>
            <!-- Display Search Results -->
            <div v-if="message" style="background: rgba(255, 191, 0, 0.1); color: #FFB700; padding: 1rem; border-radius: 8px; text-align: center; margin-bottom: 1.5rem;">{{ message }}</div>
            <div v-else-if="users.length > 0" style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; background: rgba(255, 255, 255, 0.1); border-radius: 8px;">
                    <thead>
                        <tr style="background: #2A3B5A; color: #FFFFFF;">
                            <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Id</th>
                            <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Name</th>
                            <th style="padding: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: left;">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id" style="border-bottom: 1px solid #2A3B5A;">
                            <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ user.id }}</td>
                            <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ user.name }}</td>
                            <td style="padding: 1rem; font-size: 0.9rem; color: #A0AEC0;">{{ user.email }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p v-else style="text-align: center; font-size: 1rem; color: #A0AEC0; margin-top: 1.5rem;">No professionals found.</p>
            <!-- Footer Credit -->
            <p style="font-size: 0.8rem; color: #A0AEC0; text-align: center; margin-top: 3rem;">Created by Thakur Harsh Pratap Singh</p>
        </div>
    </div>`,

    data() {
        return {
            searchQuery: "",
            users: [],
            message: ""
        };
    },

    methods: {
        async fetchUsers() {
            if (!this.searchQuery.trim()) {
                this.message = "Please enter a user name.";
                this.users = [];
                return;
            }
            try {
                const response = await fetch(`/api/search_professional?query=${encodeURIComponent(this.searchQuery)}`);
                const data = await response.json();
                console.log(data);
                if (response.ok && data.users) {
                    this.users = data.users;
                    this.message = "";
                } else {
                    this.users = [];
                    this.message = data.message || "No professionals found for the given query.";
                }
            } catch (error) {
                console.error("Error fetching professionals:", error);
                this.users = [];
                this.message = "Error fetching professionals. Please try again.";
            }
        }
    }
};