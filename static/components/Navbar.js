export default {
    props: ['loggedIn'],
    template: `
    <nav style="
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      padding: 1rem 0;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      position: sticky;
      top: 0;
      z-index: 1000;
      transition: background 0.3s ease;
    ">
      <div style="
        max-width: 1200px; 
        margin: 0 auto; 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        padding: 0 1.5rem;
      ">
        
        <!-- Brand -->
        <div>
          <router-link to="/" style="
            font-family: 'Poppins', sans-serif; 
            font-size: 1.9rem; 
            font-weight: 700; 
            background: linear-gradient(90deg, #F4A261, #FF7E5F);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-decoration: none;
            transition: transform 0.3s ease;
            display: inline-block;
          "
          onmouseover="this.style.transform='scale(1.05)'"
          onmouseout="this.style.transform='scale(1)'">
            TaskOrbit
          </router-link>
        </div>
        
        <!-- Right Links -->
        <div style="display: flex; align-items: center; gap: 1rem;">
          
          <!-- Show if not logged in -->
          <router-link v-if="!loggedIn" to="/login" style="
            font-family: 'Inter', sans-serif;
            font-size: 1rem;
            font-weight: 500;
            padding: 0.55rem 1.4rem;
            border-radius: 10px;
            background: linear-gradient(135deg, #F4A261, #FFB677);
            color: #fff;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(244,162,97,0.3);
          "
          onmouseover="this.style.transform='translateY(-2px)'"
          onmouseout="this.style.transform='translateY(0)'">
            🔑 Login
          </router-link>
  
          <router-link v-if="!loggedIn" to="/register" style="
            font-family: 'Inter', sans-serif;
            font-size: 1rem;
            font-weight: 500;
            padding: 0.55rem 1.4rem;
            border-radius: 10px;
            background: transparent;
            border: 2px solid #F4A261;
            color: #F4A261;
            text-decoration: none;
            transition: all 0.3s ease;
          "
          onmouseover="this.style.background='#F4A261'; this.style.color='#fff';"
          onmouseout="this.style.background='transparent'; this.style.color='#F4A261';">
            👤 Register Customer
          </router-link>
  
          <router-link v-if="!loggedIn" to="/registersp" style="
            font-family: 'Inter', sans-serif;
            font-size: 1rem;
            font-weight: 500;
            padding: 0.55rem 1.4rem;
            border-radius: 10px;
            background: transparent;
            border: 2px solid #F4A261;
            color: #F4A261;
            text-decoration: none;
            transition: all 0.3s ease;
          "
          onmouseover="this.style.background='#F4A261'; this.style.color='#fff';"
          onmouseout="this.style.background='transparent'; this.style.color='#F4A261';">
            🛠 Register Professional
          </router-link>
  
          <!-- Show if logged in -->
          <button v-if="loggedIn" @click="logoutUser" style="
            font-family: 'Inter', sans-serif;
            font-size: 1rem;
            font-weight: 500;
            padding: 0.55rem 1.4rem;
            border-radius: 10px;
            background: #FF6B6B;
            color: #fff;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255,107,107,0.3);
            display: flex;
            align-items: center;
            gap: 0.4rem;
          "
          onmouseover="this.style.transform='translateY(-2px)'"
          onmouseout="this.style.transform='translateY(0)'">
            <svg style="width: 1.2rem; height: 1.2rem;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
    `,
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
  