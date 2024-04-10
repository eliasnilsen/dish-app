const Footer = () => {
  return (
    <div className="bg-white py-10">
      <div className="container mx-auto flex justify-between items-start text-black">
        <span className="text-2xl font-semibold tracking-tight">RecipeApp</span>
        <span className="font-semibold tracking-tight">
          <p className="cursor pointer">Privacy Policy</p>
          <p className="cursor pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
