import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" maxWidth={1300} transition="0.75s ease-out">
      <Box margin="10px 60px" >
        <Header />
        <Box 
          as="main" 
          marginY={22} 
          backgroundImage={`url("/arch-dark.svg"), url("/left-pancake.svg"), url("/right-pancake.svg")`} 
          backgroundRepeat="no-repeat"
          backgroundPosition="center 420px, 10% 230px, 90% 230px"
          backgroundSize= "contain, 266px, 266px"
          minHeight= "90vh">
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
