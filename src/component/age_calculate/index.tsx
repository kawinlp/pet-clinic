
const index = (dob: any) => {
        const dobDate = new Date(dob);
        const currentDate = new Date();

        let ageInYears = currentDate.getFullYear() - dobDate.getFullYear();
        let ageInMonths = currentDate.getMonth() - dobDate.getMonth();
        let ageInDays = currentDate.getDate() - dobDate.getDate();

        // ปรับค่าเดือนให้ไม่ติดลบ
        if (ageInDays < 0) {
            ageInMonths--;
            ageInDays += new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                0
            ).getDate();
        }

        // ปรับค่าเดือนให้ไม่ติดลบ
        if (ageInMonths < 0) {
            ageInMonths += 12;
            ageInYears--;
        }

        let result = '';

        if (ageInYears > 0) {
            result += `${ageInYears} ปี `;
        }

        if (ageInMonths > 0) {
            result += `${ageInMonths} เดือน `;
        }

        if (ageInDays > 0) {
            result += `${ageInDays} วัน`;
        }
        return result.trim();
}

export default index