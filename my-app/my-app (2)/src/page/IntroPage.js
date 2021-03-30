
//component
import IntroHeader from '../component/common/IntroHeader';
import IntroBody from '../component/common/IntroBody';
import { Mobile, PC } from "../MediaQuery"

export default function MainPage() {
  return (
    <>
    <PC>
      <IntroHeader/>
      <IntroBody/>
    </PC>
    <Mobile>
      <IntroHeader/>
      <IntroBody/>
    </Mobile>
    </>
  );
}
