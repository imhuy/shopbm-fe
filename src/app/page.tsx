import SectionMagazine5 from "@/app/blog/SectionMagazine5";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
import Heading from "@/components/Heading/Heading";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";
import SectionGridMoreExplore from "@/components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

function PageHome() {
  return (
    <div className="nc-PageHome relative overflow-hidden">


      <div className="mt-12 lg:mt-16">
        <DiscoverMoreSlider />
      </div>

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        {/* <SectionSliderProductCard
          data={[
            PRODUCTS[4],
            SPORT_PRODUCTS[5],
            PRODUCTS[7],
            SPORT_PRODUCTS[1],
            PRODUCTS[6],
          ]}
        /> */}

        <SectionSliderProductCard
          heading="Sản Phẩm Bán Chạy"
          subHeading="Best selling of the month"
        />

        {/* <SectionPromo1 /> */}

        <div className="relative py-16 lg:py-18">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div>


        {/* <SectionPromo2 /> */}

        {/* <SectionSliderLargeProduct cardStyle="style2" /> */}

        {/* <SectionSliderCategories /> */}

        {/* <SectionPromo3 /> */}

        <SectionGridFeatureItems />

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <div>
            <Heading rightDescText="From the  blog">
              Chia sẻ kiến thức. Via. Bm. TKQC
            </Heading>
            <SectionMagazine5 />
            <div className="flex mt-16 justify-center">
              <ButtonSecondary>Show all blog articles</ButtonSecondary>
            </div>
          </div>
        </div>
        <SectionClientSay />
      </div>
    </div>
  );
}

export default PageHome;
