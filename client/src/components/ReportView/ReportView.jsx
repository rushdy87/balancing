import { useEffect, useState, useRef } from 'react';
import './ReportView.scss';
import { getReportByDate } from '../../pages/api/report';

const arabicStoreItemsnames = {
  RG: 'البنزين السوبر',
  PG: 'البنزين المحسن',
  Kerosene: 'النفط الأبيض',
  ATK: 'وقود الطائرات',
  Diesel: 'زيت الغاز',
  HFO: 'زيت الوقود الثقيل',
  HD: 'زيت الديزيل',
  LPG: 'الغاز السائل',
  PA: 'اسفلت الرص',
  sulphur: 'الكبريت الصلب',
};

const ReportView = ({ day, contentToPrint }) => {
  const [reportData, setReportData] = useState([]);
  const isFirstRender = useRef(true); // Ref to track the initial render

  useEffect(() => {
    if (isFirstRender.current) {
      // Skip the effect on the initial render
      isFirstRender.current = false;
      return;
    }

    // Fetch data when the day prop changes
    const fetchData = async () => {
      const tanksReport = await getReportByDate(day);
      console.log(tanksReport);
      setReportData(tanksReport);
    };

    fetchData();
  }, [day]); // Dependency array only includes `day`

  const renderReport = (
    <div>
      <h2>موقف الاستلام و الخزين و التجهيز لمصفى كربلاء ليوم {day}</h2>
      <div>
        <h3>استلام المواد الخام</h3>
        <div>
          <span>الغاز المستلم الطبيعي م3</span>
          <span>{reportData?.naturalGas?.receiving_m3}</span>
        </div>
        <div>
          <span>الغاز المستلم الطبيعي مقمق</span>
          <span>{reportData?.naturalGas?.receiving_mscf}</span>
        </div>
        <div>
          <span>النفط الخام المستلم 3 </span>
          <span>{reportData?.crudeOil?.receiving}</span>
        </div>
      </div>

      <div>
        <h3>خزين النفط الخام</h3>
        <div>
          <span>النفط الخام</span>
          <div>
            <span>التشغيلي</span>
            <span>{reportData?.crudeOil?.w_v_m3}</span>
          </div>
          <div>
            <span>القابل</span>
            <span>{reportData?.crudeOil?.reservoir_m3}</span>
          </div>
        </div>
        <div>
          <span>النفط الخام برميل</span>
          <div>
            <span>التشغيلي</span>
            <span>{reportData?.crudeOil?.w_v_bbl}</span>
          </div>
          <div>
            <span>القابل</span>
            <span>{reportData?.crudeOil?.reservoir_bbl}</span>
          </div>
        </div>
      </div>

      <div>
        <h3>المنتجات النهائية</h3>
        <div>
          <span>الغاز السائل</span>
          <span>{reportData?.blending?.lpg}</span>
        </div>
        <div>
          <span>البنزين السوبر</span>
          <span>{reportData?.blending?.pg}</span>
        </div>
        <div>
          <span>البنزين المحسن</span>
          <span>{reportData?.blending?.rg}</span>
        </div>
        <div>
          <span>زيت الغاز</span>
          <span>{reportData?.blending?.diesel}</span>
        </div>
        <div>
          <span>زيت الوقود الثقيل</span>
          <span>{reportData?.blending?.hfo}</span>
        </div>
        <div>
          <span>الكبريت الصلب</span>
          <span>{reportData?.blending?.solidSulphur}</span>
        </div>
      </div>

      <div>
        <h3>خزين المنتجات</h3>
        {reportData?.store?.map((item) => {
          return (
            <div key={item.product}>
              <span>{arabicStoreItemsnames[item.product]}</span>
              <div>
                <span>التشغيلي</span>
                <span>{item.working_volume}</span>
              </div>
              <div>
                <span>القابل</span>
                <span>{item.pumpable}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <div>
          <h3>
            ضخ المنتجات الخفيفة الى شركة خطوط الانابيب النفطية - مستودعي (
            كربلاء والنجف
          </h3>
          <table>
            <thead>
              <tr>
                <th>المنتوج</th>
                <th>مستودع كربلاء</th>
                <th>مستودع النجف</th>
                <th>المجموع</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>البنزين السوبر</td>
                <td>{reportData?.pumping?.pgPumping?.toKarbala}</td>
                <td>{reportData?.pumping?.pgPumping?.toNajaf}</td>
                <td>{reportData?.pumping?.pgPumping?.total}</td>
              </tr>
              <tr>
                <td>البنزين المحسن</td>
                <td>{reportData?.pumping?.rgPumping?.toKarbala}</td>
                <td>{reportData?.pumping?.rgPumping?.toNajaf}</td>
                <td>{reportData?.pumping?.rgPumping?.total}</td>
              </tr>
              <tr>
                <td>النفط الابيض</td>
                <td>{reportData?.pumping?.kerosenePumping?.toKarbala}</td>
                <td>{reportData?.pumping?.kerosenePumping?.toNajaf}</td>
                <td>{reportData?.pumping?.kerosenePumping?.total}</td>
              </tr>
              <tr>
                <td>زيت الغاز</td>
                <td>{reportData?.pumping?.dieselPumping?.toKarbala}</td>
                <td>{reportData?.pumping?.dieselPumping?.toNajaf}</td>
                <td>{reportData?.pumping?.dieselPumping?.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3>تحميل الغاز السائل</h3>
        <div>
          <span>الكمية (طن)</span>
          <span>{reportData?.lpgTransport?.quantity}</span>
        </div>
        <div>
          <span>عدد الصهاريج</span>
          <span>{reportData?.lpgTransport?.tankers}</span>
        </div>
      </div>

      <div>
        <h3>تحميل المنتجات الخفيفة</h3>
        <div>
          <div>
            <span>الكمية (م3)</span>
            <span>
              {reportData?.lightProdectsTransport?.atkTransport?.quantity}
            </span>
          </div>
          <div>
            <span>عدد الصهاريج</span>
            <span>
              {reportData?.lightProdectsTransport?.atkTransport?.tankers}
            </span>
          </div>
        </div>
        <div>
          <div>
            <span>الكمية (م3)</span>
            <span>
              {reportData?.lightProdectsTransport?.rgTransport?.quantity}
            </span>
          </div>
          <div>
            <span>عدد الصهاريج</span>
            <span>
              {reportData?.lightProdectsTransport?.rgTransport?.tankers}
            </span>
          </div>
        </div>
      </div>
      {/* HFO */}
      <div>
        <h3>تحميل زيت الوقود الثقيل</h3>
        <table>
          <thead>
            <tr>
              <th>جهة التجهيز</th>
              <th>الكمية (م3)</th>
              <th>عدد الصهاريج</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>المعامل الحكومية</td>
              <td>
                {reportData?.hfoTransport?.governmentalTransport?.quantity}
              </td>
              <td>
                {reportData?.hfoTransport?.governmentalTransport?.tankers}
              </td>
            </tr>
            <tr>
              <td>المعامل الأهلية</td>
              <td>
                {reportData?.hfoTransport?.nonGovernmentalTransport?.quantity}
              </td>
              <td>
                {reportData?.hfoTransport?.nonGovernmentalTransport?.tankers}
              </td>
            </tr>
            <tr>
              <td>التصدير</td>
              <td>{reportData?.hfoTransport?.exportTransport?.quantity}</td>
              <td>{reportData?.hfoTransport?.exportTransport?.tankers}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3>تحميل أسفلت الرصف</h3>
        <div>
          <span>الكمية (طن)</span>
          <span>{reportData?.asphaltTransport?.quantity}</span>
        </div>
        <div>
          <span>عدد الصهاريج</span>
          <span>{reportData?.asphaltTransport?.tankers}</span>
        </div>
      </div>

      <div>
        <h3>تحميل الكبريت الصلب</h3>
        <div>
          <span>الكمية (طن)</span>
          <span>{reportData?.solidSulphur?.quantity}</span>
        </div>
        <div>
          <span>عدد الصهاريج</span>
          <span>{reportData?.solidSulphur?.tankers}</span>
        </div>
      </div>
    </div>
  );

  if (isFirstRender.current) {
    return <h4>الرجاء اختيار التاريخ</h4>;
  }
  return (
    <div className='ReportView_container' ref={contentToPrint}>
      <div className='ReportView_tanks_balance'>
        {reportData ? renderReport : 'any thing'}
      </div>
    </div>
  );
};

export default ReportView;
