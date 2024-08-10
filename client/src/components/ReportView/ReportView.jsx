import { useEffect, useState, useRef } from 'react';
import './ReportView.scss';
import { getReportByDate } from '../../api/report';

const arabicStoreItemsnames = {
  PG: 'البنزين السوبر',
  RG: 'البنزين المحسن',
  Kerosene: 'النفط الأبيض',
  ATK: 'وقود الطائرات',
  Diesel: 'زيت الغاز',
  HFO: 'زيت الوقود الثقيل',
  HD: 'زيت الديزيل',
  LPG: 'الغاز السائل',
  PA: 'اسفلت الرصف',
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
      setReportData(tanksReport);
    };

    fetchData();
  }, [day]); // Dependency array only includes `day`

  const renderReport = (
    <div className='report-wrapper'>
      <h3 className='report-main-header'>
        موقف الاستلام و الخزين و التجهيز لمصفى كربلاء ليوم {day}
      </h3>

      <div className='crude_and_oil_receiving'>
        <div className='oil_receiving'>
          <div className='report_sub_header'>الغاز المستلم الطبيعي</div>
          <div className='report_row'>
            <div className='report_row_label'>متر مكعب</div>
            <div className='report_row_value'>
              {reportData?.naturalGas?.receiving_m3}
            </div>
          </div>
          <div className='report_row'>
            <div className='report_row_label'>مقمق</div>
            <div className='report_row_value'>
              {reportData?.naturalGas?.receiving_mscf}
            </div>
          </div>
        </div>
        <div className='crude'>
          <div className='report_sub_header'>النفط الخام</div>
          <div className='report_row'>
            <div className='report_row_label'>
              المستلم (م <sup>3</sup>)
            </div>
            <div className='report_row_value'>
              {reportData?.crudeOil?.receiving}
            </div>
          </div>
          <div className='report_row'>
            <div className='report_row_label'>
              المرسل (م <sup>3</sup>)
            </div>
            <div className='report_row_value'>
              {reportData?.crudeOil?.sending}
            </div>
          </div>
        </div>
        <div className='crude'>
          <div className='report_sub_header'>
            خزين النفط الخام (م <sup>3</sup>)
          </div>
          <div className='report_row'>
            <div className='report_row_label'>التشغيلي</div>
            <div className='report_row_value'>
              {reportData?.crudeOil?.w_v_m3}
            </div>
          </div>
          <div className='report_row'>
            <div className='report_row_label'>القابل</div>
            <div className='report_row_value'>
              {reportData?.crudeOil?.reservoir_m3}
            </div>
          </div>
        </div>
        <div className='crude'>
          <div className='report_sub_header'>خزين النفط الخام (برميل)</div>
          <div className='report_row'>
            <div className='report_row_label'>التشغيلي</div>
            <div className='report_row_value'>
              {reportData?.crudeOil?.w_v_bbl}
            </div>
          </div>
          <div className='report_row'>
            <div className='report_row_label'>القابل</div>
            <div className='report_row_value'>
              {reportData?.crudeOil?.reservoir_bbl}
            </div>
          </div>
        </div>
      </div>

      <div className='products_store'>
        <h4>خزين منتجات المصفى</h4>
        <div className='report_store_items'>
          {reportData?.store?.map((item) => {
            return (
              <div key={item.product} className='store_item'>
                <div className='report_sub_header'>
                  {arabicStoreItemsnames[item.product]} (م <sup>3</sup>)
                </div>
                <div className='report_row'>
                  <div className='report_row_label'>التشغيلي</div>
                  <div className='report_row_value'>{item.working_volume}</div>
                </div>
                <div className='report_row'>
                  <div className='report_row_label'>القابل</div>
                  <div className='report_row_value'>{item.pumpable}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className='blending_and_pumbing'>
        <div className='report_pumbing'>
          <h4>
            ضخ المنتجات الخفيفة الى شركة خطوط الانابيب النفطية - مستودعي (
            كربلاء والنجف)
          </h4>
          <div className='pumbing_items'>
            <div className='pumbing_items_header'>
              <div className='pumbing_column1'>المنتوج</div>
              <div className='pumbing_column2'>مستودع كربلاء</div>
              <div className='pumbing_column3'>مستودع النجف</div>
              <div className='pumbing_column4'>المجموع</div>
            </div>
            <div className='pumbing_items_row'>
              <div className='pumbing_column1'>
                البنزين السوبر (م <sup>3</sup>)
              </div>
              <div className='pumbing_column2'>
                {reportData?.pumping?.pgPumping?.toKarbala}
              </div>
              <div className='pumbing_column3'>
                {reportData?.pumping?.pgPumping?.toNajaf}
              </div>
              <div className='pumbing_column4'>
                {reportData?.pumping?.pgPumping?.total}
              </div>
            </div>
            <div className='pumbing_items_row'>
              <div className='pumbing_column1'>
                البنزين المحسن (م <sup>3</sup>)
              </div>
              <div className='pumbing_column2'>
                {reportData?.pumping?.rgPumping?.toKarbala}
              </div>
              <div className='pumbing_column3'>
                {reportData?.pumping?.rgPumping?.toNajaf}
              </div>
              <div className='pumbing_column4'>
                {reportData?.pumping?.rgPumping?.total}
              </div>
            </div>
            <div className='pumbing_items_row'>
              <div className='pumbing_column1'>
                النفط الأبيض (م <sup>3</sup>)
              </div>
              <div className='pumbing_column2'>
                {reportData?.pumping?.kerosenePumping?.toKarbala}
              </div>
              <div className='pumbing_column3'>
                {reportData?.pumping?.kerosenePumping?.toNajaf}
              </div>
              <div className='pumbing_column4'>
                {reportData?.pumping?.kerosenePumping?.total}
              </div>
            </div>
            <div className='pumbing_items_row'>
              <div className='pumbing_column1'>
                زيت الغاز (م <sup>3</sup>)
              </div>
              <div className='pumbing_column2'>
                {reportData?.pumping?.dieselPumping?.toKarbala}
              </div>
              <div className='pumbing_column3'>
                {reportData?.pumping?.dieselPumping?.toNajaf}
              </div>
              <div className='pumbing_column4'>
                {reportData?.pumping?.dieselPumping?.total}
              </div>
            </div>
          </div>
        </div>
        <div className='report_blending'>
          <h4>تحضير المنتجات النهائية</h4>
          <div className='blending_items'>
            <div className='report_row blending_row'>
              <div className='report_row_label'>
                الغاز السائل (م <sup>3</sup>)
              </div>
              <div className='report_row_value'>
                {reportData?.blending?.lpg}
              </div>
            </div>
            <div className='report_row blending_row'>
              <div className='report_row_label'>
                البنزين السوبر (م <sup>3</sup>)
              </div>
              <div className='report_row_value'>{reportData?.blending?.pg}</div>
            </div>
            <div className='report_row blending_row'>
              <div className='report_row_label'>
                البنزين المحسن (م <sup>3</sup>)
              </div>
              <div className='report_row_value'>{reportData?.blending?.rg}</div>
            </div>
            <div className='report_row blending_row'>
              <div className='report_row_label'>
                زيت الغاز (م <sup>3</sup>)
              </div>
              <div className='report_row_value'>
                {reportData?.blending?.diesel}
              </div>
            </div>
            <div className='report_row blending_row'>
              <div className='report_row_label'>
                زيت الوقود الثقيل (م <sup>3</sup>)
              </div>
              <div className='report_row_value'>
                {reportData?.blending?.hfo}
              </div>
            </div>
            <div className='report_row blending_row'>
              <div className='report_row_label'> الكبريت الصلب (طن)</div>
              <div className='report_row_value'>
                {reportData?.blending?.solidSulphur}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='light_transport'>
        <h4>تحميل المنتجات الخفيفة</h4>
        <div className='items_transport'>
          <div className='gas_transport'>
            <div className='report_sub_header'>الغاز السائل</div>
            <div className='report_row'>
              <div className='report_row_label'>الكمية (طن)</div>
              <div className='report_row_value'>
                {reportData?.lpgTransport?.quantity}
              </div>
            </div>
            <div className='report_row'>
              <div className='report_row_label'>الصهاريج</div>
              <div className='report_row_value'>
                {reportData?.lpgTransport?.tankers}
              </div>
            </div>
          </div>
          <div className='pg_transport'>
            <div className='report_sub_header'>البنزين السوبر</div>
            <div className='report_row'>
              <div className='report_row_label'>
                الكمية (م <sup>3</sup>)
              </div>
              <div className='report_row_value'>{0}</div>
            </div>
            <div className='report_row'>
              <div className='report_row_label'>الصهاريج</div>
              <div className='report_row_value'>{0}</div>
            </div>
          </div>
          <div className='rg_transport'>
            <div className='report_sub_header'>البنزين المحسن</div>
            <div className='report_row'>
              <div className='report_row_label'>
                الكمية (م <sup>3</sup>)
              </div>
              <div className='report_row_value'>
                {reportData?.lightProdectsTransport?.rgTransport?.quantity}
              </div>
            </div>
            <div className='report_row'>
              <div className='report_row_label'>الصهاريج</div>
              <div className='report_row_value'>
                {reportData?.lightProdectsTransport?.rgTransport?.tankers}
              </div>
            </div>
          </div>
          <div className='atk_transport'>
            <div className='report_sub_header'>وقود الطائرات</div>
            <div className='report_row'>
              <div className='report_row_label'>
                الكمية (م <sup>3</sup>)
              </div>
              <div className='report_row_value'>
                {reportData?.lightProdectsTransport?.atkTransport?.quantity}
              </div>
            </div>
            <div className='report_row'>
              <div className='report_row_label'>الصهاريج</div>
              <div className='report_row_value'>
                {reportData?.lightProdectsTransport?.atkTransport?.tankers}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='non_light_transport'>
        <div className='hfo_transport'>
          <h4>تحميل زيت الوقود الثقيل</h4>
          <div className='hfo_items'>
            <div className='hfo_items_header'>
              <div className='hfo_column1'>جهة التجهيز</div>
              <div className='hfo_column2'>
                الكمية (م<sup>3</sup>)
              </div>
              <div className='hfo_column3'>عدد الصهاريج</div>
            </div>
            <div className='hfo_items_row'>
              <div className='hfo_column1'>المعامل الحكومية</div>
              <div className='hfo_column2'>
                {reportData?.hfoTransport?.governmentalTransport?.quantity}
              </div>
              <div className='hfo_column3'>
                {reportData?.hfoTransport?.governmentalTransport?.tankers}
              </div>
            </div>
            <div className='hfo_items_row'>
              <div className='hfo_column1'>المعامل الاهلية</div>
              <div className='hfo_column2'>
                {reportData?.hfoTransport?.nonGovernmentalTransport?.quantity}
              </div>
              <div className='hfo_column3'>
                {reportData?.hfoTransport?.nonGovernmentalTransport?.tankers}
              </div>
            </div>
            <div className='hfo_items_row'>
              <div className='hfo_column1'>التصدير</div>
              <div className='hfo_column2'>
                {reportData?.hfoTransport?.exportTransport?.quantity}
              </div>
              <div className='hfo_column3'>
                {reportData?.hfoTransport?.exportTransport?.tankers}
              </div>
            </div>
            <div className='hfo_items_row'>
              <div className='hfo_column1'>المجموع</div>
              <div className='hfo_column2'>
                {reportData?.hfoTransport?.quantityTotlal}
              </div>
              <div className='hfo_column3'>
                {reportData?.hfoTransport?.tankersTotlal}
              </div>
            </div>
          </div>
        </div>
        <div className='asphalt_and_solidSulphur_transport'>
          <div className='asphalt_transport'>
            <h4>تحميل اسفلت الرصف</h4>
            <div className='asphalt_transport_rows'>
              <div className='report_row'>
                <div className='report_row_label'>الكمية (طن)</div>
                <div className='report_row_value'>
                  {reportData?.asphaltTransport?.quantity}
                </div>
              </div>
              <div className='report_row'>
                <div className='report_row_label'>عدد الصهاريج</div>
                <div className='report_row_value'>
                  {reportData?.asphaltTransport?.tankers}
                </div>
              </div>
            </div>
          </div>
          <div className='solidSulphur_transport'>
            <h4>تحميل الكبريت الصلب</h4>
            <div className='solidSulphur_transport_rows'>
              <div className='report_row'>
                <div className='report_row_label'>الكمية (طن)</div>
                <div className='report_row_value'>
                  {reportData?.solidSulphur?.quantity}
                </div>
              </div>
              <div className='report_row'>
                <div className='report_row_label'>عدد الصهاريج</div>
                <div className='report_row_value'>
                  {reportData?.solidSulphur?.tankers}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {reportData?.notes?.length > 0 && (
        <div className='notes'>
          <h4>{reportData?.notes.length === 1 ? 'ملاحظة' : 'ملاحظات'}</h4>
          {reportData?.notes.map((note) => (
            <p key={note.note.replace(/\s/g, '')} className='heading_bullet'>
              {note.note}
            </p>
          ))}
        </div>
      )}
    </div>
  );

  if (isFirstRender.current) {
    return <h3>الرجاء اختيار التاريخ</h3>;
  }

  return (
    <div className='ReportView_container' ref={contentToPrint}>
      <div className='report_header'>
        <div className='report_header_ref_name'>
          <span>مصفى كربلاء</span>
          <span>شعبة الاستلام والتجهيز</span>
        </div>
        <div className='report_header_date'>
          التاريخ:{' '}
          <span>{`${new Date().getDate()}-${
            new Date().getMonth() + 1
          }-${new Date().getFullYear()}`}</span>
        </div>
      </div>
      <div className='report_body'>{renderReport}</div>
      <div className='report_footer'>
        <div className='report_footer_signature'>
          <span>نذير طالب عبد الله</span>
          <span>م. شعبة الاستلام والتجهيز</span>
        </div>
      </div>
    </div>
  );
};

export default ReportView;
