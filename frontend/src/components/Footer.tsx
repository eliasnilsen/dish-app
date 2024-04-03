const Footer = () => {
  return (
    <div className="bg-teal py-10">
      <div className="container mx-auto flex justify-between items-start">
        <span className="text-2xl text-white font-semibold tracking-tight">
          RecipeApp
        </span>
        <span className="text-white font-semibold tracking-tight">
          <p className="cursor pointer">Privacy Policy</p>
          <p className="cursor pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
