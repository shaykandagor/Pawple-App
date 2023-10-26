import React from "react";
import { SvgXml } from "react-native-svg";

const Logo = ({ width = "100%", height = "100%" }) => {
  const _logo = `<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 237.3 243.4" style="enable-background:new 0 0 237.3 243.4;" xml:space="preserve">
<style type="text/css">
	.st0{ fill-rule: evenodd; clip-rule: evenodd; fill="#1c1a43"; }
</style>
<path fill="#1c1a43" class="st0" d="M67.9,137.2c7.8-6.2,24.4-24.3,30-38.4c27.2-69.2,76.8,26.3,92,38.4c30.2,24.1,40.1,46.7,12.8,73.3
	c-41.9,40.9-109.5,45.7-153.3,2.7C13.6,178.1,40.7,158.7,67.9,137.2L67.9,137.2z"/>
<path fill="#1c1a43" class="st0" d="M25.6,154c22.6-26,1.8-38.3-11.2-31.6C-18.4,139.4,11.2,170.5,25.6,154z"/>
<path fill="#1c1a43" class="st0" d="M32.1,61c-2.6,34.3,35,46.8,50.5,25.1C116.9,38,34.7,26.1,32.1,61z"/>
<path fill="#1c1a43" class="st0" d="M180.1,38c1.9-34.3-43.3-49.8-58.3-27.9C88.3,58.9,178.1,72.9,180.1,38z"/>
<path fill="#1c1a43" class="st0" d="M231.6,114.8c13.9-17-0.2-39.7-15.1-33.3C183.3,95.8,217.5,132.1,231.6,114.8z"/>
</svg>
`;
  return <SvgXml xml={_logo} width={width} height={height} />;
};

export default Logo;
