const Footer = () => {
  return (
    <div className="footer d-flex flex-column  justify-content-center align-items-center">
      <div className="mt-4">
        <img
          src="favicon.ico"
          alt="logo"
          style={{ width: "75px", height: "75px" }}
        />
      </div>
      <img src="favicon.ico" alt="logo" />
      <div className="text-white my-4">Created by Idan &copy;</div>
    </div>
  );
};

export default Footer;
