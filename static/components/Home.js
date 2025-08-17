export default {
  template: `
    <div style="
      min-height: 100vh; 
      background: linear-gradient(135deg, #f8f9fc 0%, #e8ecf5 100%); 
      display: flex; 
      flex-direction: column; 
      justify-content: center; 
      align-items: center; 
      color: #2D3748; 
      font-family: 'Poppins', sans-serif; 
      padding: 2rem;
    ">
      <div style="
        text-align: center; 
        max-width: 850px; 
        padding: 2.5rem 2rem; 
        background: rgba(255, 255, 255, 0.6); 
        backdrop-filter: blur(12px); 
        border-radius: 18px; 
        box-shadow: 0 8px 25px rgba(0,0,0,0.1); 
        transition: transform 0.4s ease;
      " 
      onmouseover="this.style.transform='translateY(-6px)'" 
      onmouseout="this.style.transform='translateY(0)'">
        
        <h1 style="
          font-size: 3rem; 
          font-weight: 700; 
          background: linear-gradient(90deg, #FF7E5F, #F4A261); 
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent; 
          margin-bottom: 1.2rem;
        ">
          Welcome to TaskOrbit
        </h1>
        
        <p style="
          font-family: 'Inter', sans-serif; 
          font-size: 1.25rem; 
          font-weight: 400; 
          color: #4A5568; 
          margin-bottom: 2.2rem; 
          line-height: 1.7;
        ">
          Discover premium household services at your fingertips. <br/> 
          Connect with trusted professionals effortlessly.
        </p>
        
        <router-link to="/login" 
          style="
            font-family: 'Inter', sans-serif; 
            font-size: 1.1rem; 
            font-weight: 600; 
            padding: 0.9rem 2.5rem; 
            border-radius: 12px; 
            background: linear-gradient(135deg, #F4A261, #FFB677); 
            color: #fff; 
            text-decoration: none; 
            box-shadow: 0 6px 20px rgba(244,162,97,0.4); 
            transition: all 0.3s ease-in-out;
            display: inline-block;
          "
          onmouseover="this.style.background='linear-gradient(135deg, #FFB677, #F4A261)'; this.style.transform='scale(1.05)'"
          onmouseout="this.style.background='linear-gradient(135deg, #F4A261, #FFB677)'; this.style.transform='scale(1)'">
          🚀 Find Services Now
        </router-link>
      </div>
    </div>
  `
}
