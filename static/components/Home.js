export default {
    template: `
      <div style="min-height: 100vh; background: linear-gradient(135deg, #1A2A44 0%, #2A3B5A 100%); display: flex; flex-direction: column; justify-content: center; align-items: center; color: #FFFFFF; font-family: 'Poppins', sans-serif; padding: 2rem;">
        <div style="text-align: center; max-width: 800px; padding: 0 1.5rem;">
          <h1 style="font-family: 'Poppins', sans-serif; font-size: 3.5rem; font-weight: 700; color: #F4A261; margin-bottom: 1.5rem; transition: color 0.3s ease;">Welcome to TaskOrbit</h1>
          <p style="font-family: 'Inter', sans-serif; font-size: 1.25rem; font-weight: 400; color: #A0AEC0; margin-bottom: 2rem; line-height: 1.6;">Discover top-tier household services at your fingertips. Connect with trusted professionals effortlessly.</p>
          <router-link to="/searchservice" style="font-family: 'Inter', sans-serif; font-size: 1.1rem; font-weight: 500; padding: 0.75rem 2rem; border-radius: 8px; background: #F4A261; color: #1A2A44; text-decoration: none; transition: background 0.3s ease, color 0.3s ease;">Find Services Now</router-link>
        </div>
      </div>
    `
}