export default {
    template: `
      <footer style="
        background: linear-gradient(135deg, #f8f9fc 0%, #e8ecf5 100%);
        padding: 2.5rem 0;
        color: #4A5568;
        font-family: 'Inter', sans-serif;
        border-top: 1px solid rgba(0,0,0,0.05);
      ">
        <div style="
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 1.5rem;
        ">
          
          <!-- Branding -->
          <h2 style="
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(90deg, #F4A261, #FF7E5F);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
          ">
            TaskOrbit
          </h2>
  
          <!-- Links -->
          <div style="display: flex; gap: 1.5rem; margin-bottom: 1.2rem; flex-wrap: wrap; justify-content: center;">
            <router-link to="/" style="color: #4A5568; font-size: 0.95rem; text-decoration: none; transition: color 0.3s ease;"
              onmouseover="this.style.color='#F4A261'"
              onmouseout="this.style.color='#4A5568'">
              Home
            </router-link>
            <router-link to="/" style="color: #4A5568; font-size: 0.95rem; text-decoration: none; transition: color 0.3s ease;"
              onmouseover="this.style.color='#F4A261'"
              onmouseout="this.style.color='#4A5568'">
              Services
            </router-link>
            <router-link to="/" style="color: #4A5568; font-size: 0.95rem; text-decoration: none; transition: color 0.3s ease;"
              onmouseover="this.style.color='#F4A261'"
              onmouseout="this.style.color='#4A5568'">
              About
            </router-link>
            <router-link to="/" style="color: #4A5568; font-size: 0.95rem; text-decoration: none; transition: color 0.3s ease;"
              onmouseover="this.style.color='#F4A261'"
              onmouseout="this.style.color='#4A5568'">
              Contact
            </router-link>
          </div>
  
          <!-- Social Icons -->
          <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
            <a href="#" style="color: #4A5568; transition: color 0.3s ease;" 
              onmouseover="this.style.color='#F4A261'"
              onmouseout="this.style.color='#4A5568'">
              🌐
            </a>
            <a href="#" style="color: #4A5568; transition: color 0.3s ease;" 
              onmouseover="this.style.color='#F4A261'"
              onmouseout="this.style.color='#4A5568'">
              💼
            </a>
            <a href="#" style="color: #4A5568; transition: color 0.3s ease;" 
              onmouseover="this.style.color='#F4A261'"
              onmouseout="this.style.color='#4A5568'">
              📧
            </a>
          </div>
  
          <!-- Copyright -->
          <p style="font-size: 0.85rem; margin: 0 0 0.5rem; color: #718096;">
            © 2025 TaskOrbit. All rights reserved.
          </p>
          <p style="font-size: 0.85rem; margin: 0; color: #F4A261; font-weight: 500;">
            Created by Thakur Harsh Pratap Singh
          </p>
        </div>
      </footer>
    `
  }
  