package unit

import (
	"testing"
	"time"

	"github.com/G1J1/sut66/team04/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestTreatment(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Best case`, func(t *testing.T) {
		CaseTID := uint(2)
		VeterinarianID := uint(2)
		ProductID := uint(2)

		treatment := entity.Treatment{
			Detail:         "ค่อยอยากพักผ่อน",
			Date:           time.Now(),
			Recuperate:     1,
			Comment:        "Hello",
			CaseTID:        &CaseTID,
			VeterinarianID: &VeterinarianID,
			ProductID:      &ProductID,
			Treatmentprice: 30000,
		}

		ok, err := govalidator.ValidateStruct(treatment)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
}

func TestDetail(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Detail is required`, func(t *testing.T) {

		CaseTID := uint(2)
		VeterinarianID := uint(2)
		ProductID := uint(2)

		treatment := entity.Treatment{
			Detail:         "",
			Date:           time.Now(),
			Recuperate:     1,
			Comment:        "Hello",
			CaseTID:        &CaseTID,
			VeterinarianID: &VeterinarianID,
			ProductID:      &ProductID,
			Treatmentprice: 4500,
		}

		ok, err := govalidator.ValidateStruct(treatment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(ContainSubstring("Detail is required"))
	})

	t.Run(`ตัวอักษรต้องน้อยกว่า 250 ตัว`, func(t *testing.T) {

		CaseTID := uint(2)
		VeterinarianID := uint(2)
		ProductID := uint(2)

		treatment := entity.Treatment{
			Detail: "dhbldbcovfszpbrmpqzxuigxqctqfbsfnuqoegslyozdrsmbqbrsrjcdbzdncijvihjqvpplzzegcqadnfqebnjhlnnijsinbkezvhisgshuvklaqfxgaqjrkochqkoyyyjtnedgiomzueckidwbekcuuyovzybsubxujeimcnrwhgrhrnrbvouwekpnqviiwvcgtwkccuzjfwqaoplbomtdeiqfirearhyhkuzvtiuqlcizxchakfcrrsv" +
				"hpgwrzdreavnnsdetroykjutpuqucxzehpnqoqqpzypycjexvfvmzlndynmnqbblzmwojsyrduihhxibdduvlpqjjrccbuaczoghuildwnqywtfrzbjqiuhkrkebstggkljucechayhynmakbhpfhoxngzzrkmkgqmwpzvjomonwnegismcaqwcciaaxdwwkmutjhxcpzdovvcpljdvolsgnudhuxuonzqxpwzealzdfcnozvvwiqhkevgh" +
				"kxwtyajwzcipvaujkyipdhspnozmjatwhtpjbfkvmysfarcawccjfezngweyjtktfhioziszwigqdabhpjuqealsmkivivnwkigxvkzcjhgkxwuepeasajqqndprhpjilacyjxjyfehowwtvmamxhvapttowbkqtkqvchmixraqbttrfzurpbrxmtqdmtmknnkbjxkapmivflxpxdfpgxzngxsonkvcoqbmyaxcckafjplswkodhawsjgod" +
				"jfgrjanzyeythuksvqiqijssncrjnpxigrbbihahfaabmktgibfftieyzmqtwxexywqxzhrmxmmoskbepecestgukylkeagrmstqsmowdweeqxatyrmrufypubfyisdcmnmtabpvraownrxfkdsyqrsifteusobuoakqacsrkfczcymqeoryemwpkxdpsfroamwvxwaazkhkimrmnziqfsetwqkafzsepushazyrevhwnqckgiowcxuphnx" +
				"zjocweikhkrmdzomsiegctcyhgcfjojqugznqgntpewybyngniqmdmbtqhmmgvdzytidillptobfbdnwhuwqiyxzecapmvmtmcsgsxcnuubcohwegfeshhubdmyqiyciaaydbjzrgsxsndolzubiwedladwdooijkbeqhcfbsqlfgqfpjdvnfakmsesaedzysuoaaxspxtorrfdsiyergofsltlifafqalwjpgvujpehyqiavitbhrlwsaf",
			Date:           time.Now(),
			Recuperate:     1,
			Comment:        "Hello",
			CaseTID:        &CaseTID,
			VeterinarianID: &VeterinarianID,
			ProductID:      &ProductID,
			Treatmentprice: 4500,
		}

		ok, err := govalidator.ValidateStruct(treatment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(ContainSubstring("ตัวอักษรต้องน้อยกว่า 250 ตัว"))
	})
}

func TestRecuperate(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`ระยะพักฟื้นต้องอยู่ระหว่าง 1-5`, func(t *testing.T) {
		CaseTID := uint(2)
		VeterinarianID := uint(2)
		ProductID := uint(2)

		treatment := entity.Treatment{
			Detail:         "บ่มีเงิน",
			Date:           time.Now(),
			Recuperate:     6,
			Comment:        "Hello",
			CaseTID:        &CaseTID,
			VeterinarianID: &VeterinarianID,
			ProductID:      &ProductID,
			Treatmentprice: 4500,
		}

		ok, err := govalidator.ValidateStruct(treatment)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(ContainSubstring("ระยะพักฟื้นต้องอยู่ระหว่าง 1-5"))
	})

}

func TestDate(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`กรุณาใส่เวลาเป็นปัจจุบัน`, func(t *testing.T) {

		CaseTID := uint(2)
		VeterinarianID := uint(2)
		ProductID := uint(2)

		treatment := entity.Treatment{
			Detail:         "ค่อยอยากพักผ่อน",
			Date:           time.Date(2000, 1, 26, 0, 0, 0, 0, time.UTC),
			Recuperate:     1,
			Comment:        "Hello",
			CaseTID:        &CaseTID,
			VeterinarianID: &VeterinarianID,
			ProductID:      &ProductID,
			Treatmentprice: 4500,
		}

		ok, err := govalidator.ValidateStruct(treatment)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(ContainSubstring("กรุณาใส่เวลาเป็นปัจจุบัน"))
	})

}

func TestTreatmentprice(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`Treatmentprice is required`, func(t *testing.T) {

		CaseTID := uint(2)
		VeterinarianID := uint(2)
		ProductID := uint(2)

		treatment := entity.Treatment{
			Detail:         "ค่อยอยากพักผ่อน",
			Date:           time.Now(),
			Recuperate:     1,
			Comment:        "Hello",
			CaseTID:        &CaseTID,
			VeterinarianID: &VeterinarianID,
			ProductID:      &ProductID,
		}

		ok, err := govalidator.ValidateStruct(treatment)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(ContainSubstring("Treatmentprice is required"))
	})

	t.Run(`ค่ารักษาต้องอยู่ระหว่าง 1-50000`, func(t *testing.T) {

		CaseTID := uint(2)
		VeterinarianID := uint(2)
		ProductID := uint(2)

		treatment := entity.Treatment{
			Detail:         "ค่อยอยากพักผ่อน",
			Date:           time.Now(),
			Recuperate:     1,
			Comment:        "Hello",
			CaseTID:        &CaseTID,
			VeterinarianID: &VeterinarianID,
			ProductID:      &ProductID,
			Treatmentprice: 60000,
		}

		ok, err := govalidator.ValidateStruct(treatment)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(ContainSubstring("ค่ารักษาต้องอยู่ระหว่าง 1-50000"))
	})

}
