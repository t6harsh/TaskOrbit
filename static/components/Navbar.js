export default {
    props: ['loggedIn'],
    template: `
    <nav style="background: linear-gradient(90deg, #1A2A44 0%, #2A3B5A 100%); padding: 1rem 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); position: sticky; top: 0; z-index: 1000;">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0 1.5rem;">
            <div>
                <router-link to="/" style="font-family: 'Poppins', sans-serif; font-size: 1.8rem; font-weight: 600; color: #F4A261; text-decoration: none; transition: color 0.3s ease;">TaskOrbit</router-link>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
                <router-link v-if="!loggedIn" to="/login" style="font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 500; padding: 0.5rem 1.2rem; border-radius: 8px; text-decoration: none; background: #F4A261; color: #1A2A44; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.5rem;">Login</router-link>
                <router-link v-if="!loggedIn" to="/register" style="font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 500; padding: 0.5rem 1.2rem; border-radius: 8px; text-decoration: none; background: transparent; border: 2px solid #F4A261; color: #F4A261; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.5rem;">Register Customer</router-link>
                <router-link v-if="!loggedIn" to="/registersp" style="font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 500; padding: 0.5rem 1.2rem; border-radius: 8px; text-decoration: none; background: transparent; border: 2px solid #F4A261; color: #F4A261; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.5rem;">Register Professional</router-link>
                <button v-if="loggedIn" @click="logoutUser" style="font-family: 'Inter', sans-serif; font-size: 1rem; font-weight: 500; padding: 0.5rem 1.2rem; border-radius: 8px; background: #FF6B6B; color: #FFFFFF; border: none; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.5rem;">
                    <svg style="width: 1.2rem; height: 1.2rem;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    </nav>`,
    data: function(){
        return {
            loggedIn: localStorage.getItem('auth_token')
        }
    },
    methods:{
        logoutUser(){
            localStorage.clear()
            this.$router.go('/')
            this.$emit('logout')
        }
    }
}