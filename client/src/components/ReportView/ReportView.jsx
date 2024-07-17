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
    <div className='report-wrapper'>
      <h3 className='report-main-header'>
        موقف الاستلام و الخزين و التجهيز لمصفى كربلاء ليوم {day}
      </h3>
      <div className='report-context'>
        <div className='report-context_section'>
          <h4>استلام المواد الخام</h4>
          <div className='context_section_items'>
            <div className='report_column'>
              <span className='report_column_header'>
                الغاز المستلم الطبيعي م<sup>3</sup>
              </span>
              <span>{reportData?.naturalGas?.receiving_m3}</span>
            </div>
            <div className='report_column'>
              <span className='report_column_header'>
                الغاز المستلم الطبيعي مقمق
              </span>
              <span>{reportData?.naturalGas?.receiving_mscf}</span>
            </div>
            <div className='report_column'>
              <span className='report_column_header'>
                النفط الخام المستلم م<sup>3</sup>
              </span>
              <span>{reportData?.crudeOil?.receiving}</span>
            </div>
          </div>
        </div>

        <div className='report-context_section'>
          <h4>خزين النفط الخام</h4>
          <div className='context_section_items'>
            <div className='report_column'>
              <span className='report_column_header'>النفط الخام</span>
              <div className='report_column_body_row'>
                <span className='report_column_body_row_subtitle'>
                  التشغيلي
                </span>
                <span>{reportData?.crudeOil?.w_v_m3}</span>
              </div>

              <div className='report_column_body_row'>
                <span className='report_column_body_row_subtitle'>القابل</span>
                <span>{reportData?.crudeOil?.reservoir_m3}</span>
              </div>
            </div>
            <div className='report_column'>
              <span className='report_column_header'>النفط الخام برميل</span>
              <div className='report_column_body_row'>
                <span className='report_column_body_row_subtitle'>
                  التشغيلي
                </span>
                <span>{reportData?.crudeOil?.w_v_bbl}</span>
              </div>
              <div className='report_column_body_row'>
                <span className='report_column_body_row_subtitle'>القابل</span>
                <span>{reportData?.crudeOil?.reservoir_bbl}</span>
              </div>
            </div>
            <div className='report_column'>
              <span className='report_column_header'>
                النفط الخام المرسل م<sup>3</sup>
              </span>
              <span className='report_column_body'>
                {reportData?.crudeOil?.sending}
              </span>
            </div>
          </div>
        </div>

        <div className='report-context_section'>
          <h4>المنتجات النهائية</h4>
          <div className='report_column blending'>
            <div className='report_column_body_row'>
              <span className='report_column_body_row_subtitle'>
                الغاز السائل
              </span>
              <span>{reportData?.blending?.lpg}</span>
            </div>
            <div className='report_column_body_row'>
              <span className='report_column_body_row_subtitle'>
                البنزين السوبر
              </span>
              <span>{reportData?.blending?.pg}</span>
            </div>
            <div className='report_column_body_row'>
              <span className='report_column_body_row_subtitle'>
                البنزين المحسن
              </span>
              <span>{reportData?.blending?.rg}</span>
            </div>
            <div className='report_column_body_row'>
              <span className='report_column_body_row_subtitle'>زيت الغاز</span>
              <span>{reportData?.blending?.diesel}</span>
            </div>
            <div className='report_column_body_row'>
              <span className='report_column_body_row_subtitle'>
                زيت الوقود الثقيل
              </span>
              <span>{reportData?.blending?.hfo}</span>
            </div>
            <div className='report_column_body_row'>
              <span className='report_column_body_row_subtitle'>
                الكبريت الصلب
              </span>
              <span>{reportData?.blending?.solidSulphur}</span>
            </div>
          </div>
        </div>

        <div className='report-context_section'>
          <h4>خزين المنتجات</h4>
          <div className='report-context_store'>
            {reportData?.store?.map((item) => {
              return (
                <div key={item.product} className='report_column'>
                  <span className='report_column_header'>
                    {arabicStoreItemsnames[item.product]}
                  </span>
                  <div className='report_column_body_row'>
                    <span className='report_column_body_row_subtitle'>
                      التشغيلي
                    </span>
                    <span>{item.working_volume}</span>
                  </div>
                  <div className='report_column_body_row'>
                    <span className='report_column_body_row_subtitle'>
                      القابل
                    </span>
                    <span>{item.pumpable}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className='report-context_section pumping'>
          <h4>
            ضخ المنتجات الخفيفة الى شركة خطوط الانابيب النفطية - مستودعي (
            كربلاء والنجف)
          </h4>
          <table>
            <thead>
              <tr>
                <th className='table_header'>المنتوج</th>
                <th className='table_header'>مستودع كربلاء</th>
                <th className='table_header'>مستودع النجف</th>
                <th className='table_header'>المجموع</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='table_header'>البنزين السوبر</td>
                <td className='table_cell'>
                  {reportData?.pumping?.pgPumping?.toKarbala}
                </td>
                <td className='table_cell'>
                  {reportData?.pumping?.pgPumping?.toNajaf}
                </td>
                <td className='table_cell'>
                  {reportData?.pumping?.pgPumping?.total}
                </td>
              </tr>
              <tr>
                <td className='table_header'>البنزين المحسن</td>
                <td className='table_cell'>
                  {reportData?.pumping?.rgPumping?.toKarbala}
                </td>
                <td className='table_cell'>
                  {reportData?.pumping?.rgPumping?.toNajaf}
                </td>
                <td className='table_cell'>
                  {reportData?.pumping?.rgPumping?.total}
                </td>
              </tr>
              <tr>
                <td className='table_header'>النفط الابيض</td>
                <td className='table_cell'>
                  {reportData?.pumping?.kerosenePumping?.toKarbala}
                </td>
                <td className='table_cell'>
                  {reportData?.pumping?.kerosenePumping?.toNajaf}
                </td>
                <td className='table_cell'>
                  {reportData?.pumping?.kerosenePumping?.total}
                </td>
              </tr>
              <tr>
                <td className='table_header'>زيت الغاز</td>
                <td className='table_cell'>
                  {reportData?.pumping?.dieselPumping?.toKarbala}
                </td>
                <td className='table_cell'>
                  {reportData?.pumping?.dieselPumping?.toNajaf}
                </td>
                <td className='table_cell'>
                  {reportData?.pumping?.dieselPumping?.total}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='reprt_transport_section'>
          {/* التحميل */}

          <div className='report-context_section'>
            <h4>تحميل الغاز السائل</h4>
            <div className='report_column'>
              <span className='report_column_header'>الغاز السائل</span>
              <div className='report_column_body_row'>
                <span className='report_column_body_row_subtitle'>
                  الكمية (طن)
                </span>
                <span>{reportData?.lpgTransport?.quantity}</span>
              </div>

              <div className='report_column_body_row'>
                <span className='report_column_body_row_subtitle'>
                  عدد الصهاريج
                </span>
                <span>{reportData?.lpgTransport?.tankers}</span>
              </div>
            </div>
          </div>

          <div className='report-context_section'>
            <h4>تحميل المنتجات الخفيفة</h4>
            <div className='light-prodects-transport'>
              <div className='report_column'>
                <span className='report_column_header'>وقود الطائرات</span>
                <div className='report_column_body_row'>
                  <span>الكمية (م3)</span>
                  <span>
                    {reportData?.lightProdectsTransport?.atkTransport?.quantity}
                  </span>
                </div>
                <div className='report_column_body_row'>
                  <span>عدد الصهاريج</span>
                  <span>
                    {reportData?.lightProdectsTransport?.atkTransport?.tankers}
                  </span>
                </div>
              </div>

              <div className='report_column'>
                <span className='report_column_header'>البنزين المحسن</span>
                <div className='report_column_body_row'>
                  <span>الكمية (م3)</span>
                  <span>
                    {reportData?.lightProdectsTransport?.rgTransport?.quantity}
                  </span>
                </div>
                <div className='report_column_body_row'>
                  <span>عدد الصهاريج</span>
                  <span>
                    {reportData?.lightProdectsTransport?.rgTransport?.tankers}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* HFO */}
        <div>
          <h4>تحميل زيت الوقود الثقيل</h4>
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
          <h4>تحميل أسفلت الرصف</h4>
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
          <h4>تحميل الكبريت الصلب</h4>
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
