import { Component } from 'react';
import { Link } from 'react-router-dom';
import image1 from '../kachaf.jpg';

class Home extends Component {

    render() {
        return (
            <div className="home-page">
                <img src={image1} alt="not-found" />
                <h2 className="pb-2">بسم الله الرحمن الرحيم</h2>
                <h3 className="py-3">وَأُخْرَىٰ تُحِبُّونَهَا ۖ نَصْرٌ مِّنَ ٱللَّهِ وَفَتْحٌ قَرِيبٌ ۗ وَبَشِّرِ ٱلْمُؤْمِنِينَ</h3>
                <div className='list-dashboard'>
                    <ul>
                        <Link to="/onsors">  <li>إدارة العناصر</li></Link>
                        {/* <Link to="/talabat"> <li>طلبات الإنتساب</li></Link> */}
                        <Link to="/kadeh"><li>إدارة القادة</li></Link>
                        <Link to="/add-info"><li>إدارة المفوضية</li></Link>
                        <Link to="/relation"><li>الهيكل</li></Link>

                    </ul>
                </div>


                <div className="footer">
                    <h4 className="text-center">جمعية كشافة الإيمان الإسلامية</h4>
                </div>

            </div>
        );
    }
}

export default Home;
