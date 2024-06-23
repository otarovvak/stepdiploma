import Face from "../assets/image.png";
const Hero = () => {
  return (
    <section className="relative bg-hero bg-cover bg-center bg-no-repeat h-[811px] w-full">
      <div className="max_padd_container relative top-10 xs:top-48 grid md:grid-cols-2 gap-20">
        <div>
          <h1 className="h1 capitalize max-w-[37rem]">
            Transform Your Beauty Routine
          </h1>
          <p className="text-gray-50 regular-16 mt-6 max-w-[33rem] ">
            we believe that true beauty is a reflection of holistic care and
            self-love. Our curated selection of cosmetics and skincare products
            is designed to enhance your natural radiance from within.
          </p>
        </div>
        <div className="hidden md:block text-center ">
          <img src={Face} className="w-11/12 object-cover" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
