import React from "react";

function getRandomDateWithinLast3Months() {
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);
  const randomTime = Math.random() * (now.getTime() - threeMonthsAgo.getTime());
  return new Date(threeMonthsAgo.getTime() + randomTime);
}

export default function Blog({ lang }) {
  const [search, setSearch] = React.useState("");
  const posts = React.useMemo(() => {
    const unsortedPosts = [
      {
        title: lang === "th" ? "บทบาทของรถขุดดินในอุตสาหกรรมก่อสร้างที่เติบโตของประเทศไทย" : "The Role of Excavators in Thailand’s Growing Construction Industry",
        content: lang === "th" ? `อุตสาหกรรมก่อสร้างของประเทศไทยเติบโตอย่างรวดเร็ว โดยมีการขยายตัวของเมืองและโครงการโครงสร้างพื้นฐานเป็นตัวขับเคลื่อน ความต้องการเครื่องจักรหนักอย่างรถขุดดินจึงเพิ่มขึ้นอย่างมาก รถขุดดินเป็นเครื่องจักรที่หลากหลายและจำเป็นสำหรับงานขุดดิน การรื้อถอน และการขนย้ายวัสดุ ทำให้เป็นหัวใจสำคัญขอ��โครงการก่อสร้างในยุคปัจจุบัน

        รถขุดดินมีหลายขนาดและหลายประเภท ตั้งแต่รุ่นเล็กสำหรับงานขนาดเล็กไปจนถึงรุ่นใหญ่สำหรับโครงการโครงสร้างพื้นฐานขนาดใหญ่ เช่น ทางหลวงหรืออาคารขนาดใหญ่ ด้วยเทคโนโลยีที่ล้ำหน้า เช่น ระบบไฮดรอลิกและ GPS รถขุดดินช่วยเพิ่มประสิทธิภาพและความแม่นยำ ทำให้โครงการเสร็จเร็วและตรงเวลา

        ด้วยการเลือกและบำรุงรักษารถขุดดินอย่างเหมาะสม ผู้ประกอบการสามารถประหยัดเวลาและค่าใช้จ่าย และทำให้โครงการดำเนินไปอย่างราบรื่น` : `Thailand's construction industry is rapidly growing, driven by urban expansion and infrastructure projects. The demand for heavy machinery like excavators has significantly increased. Excavators are versatile and essential for digging, demolition, and material handling, making them a cornerstone of modern construction projects.

        Excavators come in various sizes and types, from small models for minor projects to large ones for major infrastructure projects like highways or large buildings. With advanced technology such as hydraulic systems and GPS, excavators enhance efficiency and precision, ensuring projects are completed quickly and on time.

        By selecting and maintaining excavators properly, operators can save time and costs, ensuring smooth project execution.`,
        date: getRandomDateWithinLast3Months()
      },
      {
        title: lang === "th" ? "วิธีเช่าอุปกรณ์ก่อสร้างในประเทศไทย: คู่มือแบบครบถ้วน" : "How to Rent Construction Equipment in Thailand: A Complete Guide",
        content: lang === "th" ? `การเช่าอุปกรณ์ก่อสร้างในประเทศไทยเป็นตัวเลือกที่คุ้มค่าและมีประสิทธิภาพสำหรับผู้รับเหมา เพราะช่วยเพิ่มความยืดหยุ่นในการดำเนินโครงการ และช่วยประหยัดค่าใช้จ่ายเมื่อเทียบกับการซื้อเครื่องจักร

        ในการเช่าอุปกรณ์ คุณควร:
        1. ค้นหาบริษัทที่น่าเชื่อถือ: เลือกบริษัทที่มีรีวิวดีและเครื่องจักรที่ทันสมัย
        2. ตรวจสอบสภาพเครื่องจักร: ตรวจสอบเครื่องจักรให้อยู่ในสภาพที่ดีเพื่อลดปัญหาระหว่างใช้งาน
        3. พิจารณาเงื่อนไขการเช่า: เลือกเงื่อนไขที่เหมาะสมกับความต้องการของโครงการ

        การเช่าอุปกรณ์ เช่น รถขุดดิน รถเครน และรถตัก ทำให้ผู้รับเหมาสามารถปรับการทำงานได้อย่างมีประสิทธิภาพและประหยัดต้นทุนในระยะยาว` : `Renting construction equipment in Thailand is a cost-effective and efficient option for contractors, providing flexibility in project execution and saving costs compared to purchasing machinery.

        To rent equipment, you should:
        1. Find a reputable company: Choose a company with good reviews and modern machinery.
        2. Inspect the equipment: Ensure the machinery is in good condition to minimize issues during use.
        3. Consider rental terms: Select terms that suit your project needs.

        Renting equipment like excavators, cranes, and loaders allows contractors to work efficiently and save costs in the long run.`,
        date: getRandomDateWithinLast3Months()
      },
      {
        title: lang === "th" ? "คู่มือการบำรุงรักษารถก่อสร้าง: เพื่อให้เครื่องจักรทำงานได้อย่างราบรื่น" : "Maintenance Guide for Construction Vehicles: Keep Your Machines Running Smoothly",
        content: lang === "th" ? `การบำรุงรักษารถก่อสร้างอย่างถูกต้องเป็นสิ่งสำคัญเพื่อลดเวลาหยุดซ่อมและยืดอายุการใช้งานของเครื่องจักร การตรวจสอบและทำความสะอาดเป็นประจำ รวมถึงการเปลี่ยนชิ้นส่วนที่สึกหรอ สามารถช่วยลดค่าใช้จ่ายในการซ่อมบำรุง

        เคล็ดลับสำคัญในการบำรุงรักษา:
        • ตรวจสอบระดับของเหลวเป็นประจำเพื่อป้องกันความเสียหายของเครื่องยนต์
        • ตรวจสอบยางหรือตีนตะขาบว่ามีการสึกหรอหรือไม่ แ��ะเปลี่ยนทันทีเมื่อจำเป็น
        • ฝึกอบรมผู้ใช้งานให้ใช้งานเครื่องจักรอย่างถูกวิธีเพื่อลดความเสียหายที่ไม่จำเป็น

        การมีแผนการบำรุงรักษาอย่างชัดเจนช่วยประหยัดต้นทุนและทำให้โครงการดำเนินไปอย่างราบรื่น` : `Proper maintenance of construction vehicles is essential for reducing downtime and extending the life of your machinery. Regular inspections, cleaning, and servicing can prevent costly repairs and ensure your equipment operates at peak efficiency.

        Key Maintenance Tips:
        • Check fluid levels regularly to prevent engine damage.
        • Inspect tires or tracks for wear and replace them when necessary.
        • Train operators to handle equipment properly to avoid unnecessary wear and tear.

        Having a proactive maintenance schedule not only saves money but also ensures your project runs smoothly without unexpected delays.`,
        date: getRandomDateWithinLast3Months()
      },
      {
        title: lang === "th" ? "ความปลอดภัยมาเป็นอันดับแรก: การใช้งานอุปกรณ์หนักในไซต์ก่อสร้างไทยอย่างถูกวิธี" : "Safety First: Ensuring Proper Use of Heavy Equipment on Thai Construction Sites",
        content: lang === "th" ? `ความปลอดภัยในไซต์ก่อสร้างถือเป็นสิ่งสำคัญ โดยเฉพาะอย่างยิ่งในการใช้งานอุปกรณ์หนัก การฝึกอบรมผู้ใช้งาน ตรวจสอบเครื่องจักร และการสื่อสารที่ชัดเจนสามารถลดความเสี่ยงของอุบัติเหตุได้อย่างมาก

        แนวทางปฏิบัติที่ดีที่สุดสำหรับความปลอดภัย:
        1. ฝึกอบรมผู้ใช้งานให้ใช้งานเครื่องจักรเฉพาะอย่างถูกต้อง
        2. ตรวจสอบเครื่องจักรเป็นประจำเพื่อให้แน่ใจว่าอยู่ในสภาพที่ดี
        3. ใช้อุปกรณ์ป้องกันส่วนบุคคล เช่น หมวกนิรภัยและรองเท้าบูทนิรภัย ตลอดเวลา

        ด้วยการให้ความสำคัญกับความปลอดภัย ผู้รับเหมาสามารถสร้างสภาพแวดล้อมการทำงานที่ปลอดภัยและมีประสิทธิภาพ` : `Safety is a top priority on construction sites, especially when operating heavy equipment. Proper training, regular equipment checks, and effective communication can significantly reduce accidents.

        Best Practices for Heavy Equipment Safety:
        1. Train operators to use specific machinery safely.
        2. Perform routine inspections to ensure all equipment is in good condition.
        3. Use personal protective equipment (PPE), such as helmets and safety boots, at all times.

        By prioritizing safety, contractors can create a more secure and productive work environment while minimizing risks.`,
        date: getRandomDateWithinLast3Months()
      },
      {
        title: lang === "th" ? "แนวทางการก่อสร้างที่ยั่งยืนในประเทศไทย: สร้างสรรค์เพื่ออนาคต" : "Sustainable Construction Practices in Thailand: Building for the Future",
        content: lang === "th" ? `ความยั่งยืนกำลังเป็นหัวข้อสำคัญในอุตสาหกรรมก่อสร้างของประเทศไทย การนำแนวทางที่เป็นมิตรกับสิ่งแวดล้อมมาใช้ช่วยลดผลกระทบต่อสิ่งแวดล้อมและตอบโจทย์ลูกค้าที่ใส่ใจในสิ่งแวดล้อม

        แนวทางการก่อสร้างที่ยั่งยื��:
        • ใช้วัสดุที่เป็นมิตรกับสิ่งแวดล้อม เช่น ไม้ไผ่หรือเหล็กรีไซเคิล
        • ใช้เทคโนโลยีสีเขียว เช่น แผงโซลาร์เซลล์และเครื่องจักรที่ประหยัดพลังงาน
        • รีไซเคิลของเสียจากการก่อสร้างเพื่อลดปริมาณขยะที่ต้องนำไปฝังกลบ

        ด้วยการผสมผสานแนวทางการก่อสร้างที่ยั่งยืน ผู้รับเหมาชาวไทยสาม��รถสร้างอนาคตที่เป็นมิตรกับสิ่งแวดล้อมและลดต้นทุนไปพร้อมกัน` : `Sustainability is becoming a key focus in Thailand’s construction industry. By adopting eco-friendly practices, contractors can reduce their environmental impact while appealing to eco-conscious clients.

        Sustainable Practices Include:
        • Using eco-friendly materials like bamboo or recycled steel.
        • Implementing green technologies such as solar panels and energy-efficient machinery.
        • Recycling construction waste to minimize landfill usage.

        By integrating sustainable practices, Thai contractors can build for the future while reducing costs and conserving resources.`,
        date: getRandomDateWithinLast3Months()
      }
    ];
    return unsortedPosts.sort((a, b) => b.date - a.date);
  }, [lang]);

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl">{lang === "th" ? "บล็อก" : "Blog"}</h1>
      <input
        type="text"
        placeholder={lang === "th" ? "ค้นหา..." : "Search..."}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 w-full mb-6 rounded"
      />
      {filteredPosts.map((post, idx) => (
        <article key={idx} className="my-8 border-b pb-4">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-sm text-gray-500 mb-2">
            {post.date.toLocaleDateString()} • {lang === "th" ? "โกโก้" : "Koko"}
          </p>
          <p className="mt-2">{post.content}</p>
        </article>
      ))}
    </div>
  );
}