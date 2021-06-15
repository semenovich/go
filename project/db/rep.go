package db

import (
	"../models"
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"sort"
)

func createConnectin() *sql.DB {
	connStr := "user=admin password=admin dbname=postgres sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	return db
}

func InsertDiplom(diplom models.Diplom) (models.Diplom, error) {
	db := createConnectin()
	defer db.Close()
	err := db.QueryRow("insert into diplom (fio, topic, completion, score, deadline, queuenumber, pmid, normcontrollerid, reviewerid, chairmanid, diplomorderid, specialtyid, commissionid, execution, type, commissioncomment, ordernumber) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) returning id",
		diplom.Fio, diplom.Topic, diplom.Completion, diplom.Score, diplom.Deadline, diplom.Queuenumber, diplom.PmId, diplom.NormcontrollerId, diplom.ReviewerId, diplom.ChairmanId, diplom.DiplomorderId, diplom.SpecialtyId, diplom.CommissionId, diplom.Execution, diplom.Type, diplom.CommissionComment, diplom.Ordernumber).Scan(&diplom.Id)
	if err != nil {
		panic(err)
	}
	return diplom, err
}

func DeleteDiplom(id int) error {
	db := createConnectin()
	defer db.Close()
	_, err := db.Exec("delete from diplom values where id = $1", id)
	if err != nil {
		panic(err)
	}
	return err
}

func UpdateDiplom(diplom models.Diplom) (models.Diplom, error) {
	db := createConnectin()
	defer db.Close()
	if _, err := db.Exec("update diplom set Fio = $2, Topic = $3, Completion = $4, Score = $5, Deadline = $6, Queuenumber = $7, PmId = $8, NormcontrollerId = $9, ReviewerId = $10, ChairmanId = $11, DiplomorderId = $12, SpecialtyId = $13, CommissionId = $14, execution = $15, type = $16, commissioncomment = $17, time = $18, ordernumber = $19 where id = $1",
		diplom.Id, diplom.Fio,
		diplom.Topic, diplom.Completion,
		diplom.Score, diplom.Deadline,
		diplom.Queuenumber, diplom.PmId,
		diplom.NormcontrollerId, diplom.ReviewerId,
		diplom.ChairmanId, diplom.DiplomorderId,
		diplom.SpecialtyId, diplom.CommissionId,
		diplom.Execution, diplom.Type, diplom.CommissionComment, diplom.Time, diplom.Ordernumber);
		err != nil {
		return diplom, err
	}
	return diplom, nil
}

func GetAllDiploms() ([]models.Diplom, error) {
	db := createConnectin()
	defer db.Close()
	rows, err := db.Query("select * from diplom order by deadline, ordernumber")
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	diplomAll := []models.Diplom{}

	for rows.Next() {
		p := models.Diplom{}
		err := rows.Scan(&p.Id, &p.Fio, &p.Topic, &p.Completion, &p.Score, &p.Queuenumber, &p.Deadline, &p.PmId, &p.NormcontrollerId, &p.ReviewerId, &p.ChairmanId, &p.DiplomorderId, &p.SpecialtyId, &p.CommissionId, &p.Execution, &p.Type, &p.CommissionComment, &p.Time, &p.Ordernumber)
		if err != nil {
			fmt.Println(err)
			continue
		}
		diplomAll = append(diplomAll, p)
	}
	//sort.Slice(diplomAll, func(i, j int) bool {
	//	return diplomAll[i].Id < diplomAll[j].Id
	//})
	return diplomAll, err
}

func GetDiplom(id int) (models.Diplom, error) {
	db := createConnectin()
	defer db.Close()
	p := models.Diplom{}
	err := db.QueryRow("select * from diplom where id = $1 limit 1", id).Scan(&p.Id, &p.Fio, &p.Topic, &p.Completion, &p.Score, &p.Queuenumber, &p.Deadline, &p.PmId, &p.NormcontrollerId, &p.ReviewerId, &p.ChairmanId, &p.DiplomorderId, &p.SpecialtyId, &p.CommissionId, &p.Execution, &p.Type, &p.CommissionComment, &p.Time, &p.Ordernumber)
	return p, err
}

func InsertChairman(chairman models.Teacher) (models.Teacher, error) {
	db := createConnectin()
	defer db.Close()
	err := db.QueryRow("insert into chairman (fio) values ($1) returning id",
		chairman.Fio).Scan(&chairman.Id)
	if err != nil {
		panic(err)
	}
	return chairman, err
}

func GetChairman() ([]models.Teacher, error) {
	db := createConnectin()
	defer db.Close()
	rows, err := db.Query("select * from chairman")
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	chairmanAll := []models.Teacher{}

	for rows.Next() {
		p := models.Teacher{}
		err := rows.Scan(&p.Id, &p.Fio)
		if err != nil {
			fmt.Println(err)
			continue
		}
		chairmanAll = append(chairmanAll, p)
	}
	sort.Slice(chairmanAll, func(i, j int) bool {
		return chairmanAll[i].Id < chairmanAll[j].Id
	})
	return chairmanAll, err
}

func DeleteChairman(id int) error {
	db := createConnectin()
	defer db.Close()
	_, err := db.Exec("delete from chairman values where id = $1", id)
	if err != nil {
		panic(err)
	}
	return err
}

func UpdateChairman(chairman models.Teacher) (models.Teacher, error) {
	db := createConnectin()
	defer db.Close()
	if _, err := db.Exec("update chairman set Fio = $2 where id = $1",
		chairman.Id, chairman.Fio);
		err != nil {
		return chairman, err
	}
	return chairman, nil
}

func InsertCommission(commission models.Teacher) (models.Teacher, error) {
	db := createConnectin()
	defer db.Close()
	err := db.QueryRow("insert into commission (fio) values ($1) returning id",
		commission.Fio).Scan(&commission.Id)
	if err != nil {
		panic(err)
	}
	return commission, err
}

func GetCommissionn() ([]models.Teacher, error) {
	db := createConnectin()
	defer db.Close()
	rows, err := db.Query("select * from commission")
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	commissionAll := []models.Teacher{}

	for rows.Next() {
		p := models.Teacher{}
		err := rows.Scan(&p.Id, &p.Fio)
		if err != nil {
			fmt.Println(err)
			continue
		}
		commissionAll = append(commissionAll, p)
	}
	sort.Slice(commissionAll, func(i, j int) bool {
		return commissionAll[i].Id < commissionAll[j].Id
	})
	return commissionAll, err
}

func DeleteCommissionn(id int) error {
	db := createConnectin()
	defer db.Close()
	_, err := db.Exec("delete from commission values where id = $1", id)
	if err != nil {
		panic(err)
	}
	return err
}

func UpdateCommissionn(commission models.Teacher) (models.Teacher, error) {
	db := createConnectin()
	defer db.Close()
	if _, err := db.Exec("update commission set Fio = $2 where id = $1",
		commission.Id, commission.Fio);
		err != nil {
		return commission, err
	}
	return commission, nil
}

func InsertDiplomOrder(diplomOrder models.DiplomOrder) (models.DiplomOrder, error) {
	db := createConnectin()
	defer db.Close()
	err := db.QueryRow("insert into diplomorder (name, dateorder) values ($1, $2) returning id",
		diplomOrder.Name, diplomOrder.Dateorder).Scan(&diplomOrder.Id)
	if err != nil {
		panic(err)
	}
	return diplomOrder, err
}

func GetDiplomOrder() ([]models.DiplomOrder, error) {
	db := createConnectin()
	defer db.Close()
	rows, err := db.Query("select * from diplomorder")
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	diplomOrderAll := []models.DiplomOrder{}

	for rows.Next() {
		p := models.DiplomOrder{}
		err := rows.Scan(&p.Id, &p.Name, &p.Dateorder)
		if err != nil {
			fmt.Println(err)
			continue
		}
		diplomOrderAll = append(diplomOrderAll, p)
	}
	sort.Slice(diplomOrderAll, func(i, j int) bool {
		return diplomOrderAll[i].Id < diplomOrderAll[j].Id
	})
	return diplomOrderAll, err
}

func DeleteDiplomOrder(id int) error {
	db := createConnectin()
	defer db.Close()
	_, err := db.Exec("delete from diplomorder values where id = $1", id)
	if err != nil {
		panic(err)
	}
	return err
}

func UpdateDiplomOrder(diplomorder models.DiplomOrder) (models.DiplomOrder, error) {
	db := createConnectin()
	defer db.Close()
	if _, err := db.Exec("update diplomorder set name = $2, dateorder = $3 where id = $1",
		diplomorder.Id, diplomorder.Name, diplomorder.Dateorder);
		err != nil {
		return diplomorder, err
	}
	return diplomorder, nil
}

func InsertNormcontroller(normcontroller models.Teacher) (models.Teacher, error) {
	db := createConnectin()
	defer db.Close()
	err := db.QueryRow("insert into normcontroller (fio) values ($1) returning id",
		normcontroller.Fio).Scan(&normcontroller.Id)
	if err != nil {
		panic(err)
	}
	return normcontroller, err
}

func GetNormcontroller() ([]models.Teacher, error) {
	db := createConnectin()
	defer db.Close()
	rows, err := db.Query("select * from normcontroller")
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	normcontrollerAll := []models.Teacher{}

	for rows.Next() {
		p := models.Teacher{}
		err := rows.Scan(&p.Id, &p.Fio)
		if err != nil {
			fmt.Println(err)
			continue
		}
		normcontrollerAll = append(normcontrollerAll, p)
	}
	sort.Slice(normcontrollerAll, func(i, j int) bool {
		return normcontrollerAll[i].Id < normcontrollerAll[j].Id
	})
	return normcontrollerAll, err
}

func DeleteNormcontroller(id int) error {
	db := createConnectin()
	defer db.Close()
	_, err := db.Exec("delete from normcontroller values where id = $1", id)
	if err != nil {
		panic(err)
	}
	return err
}

func UpdateNormcontroller(normcontroller models.Teacher) (models.Teacher, error) {
	db := createConnectin()
	defer db.Close()
	if _, err := db.Exec("update normcontroller set Fio = $2 where id = $1",
		normcontroller.Id, normcontroller.Fio);
		err != nil {
		return normcontroller, err
	}
	return normcontroller, nil
}

func InsertPm(pm models.Teacher) (models.Teacher, error) {
	db := createConnectin()
	defer db.Close()
	err := db.QueryRow("insert into pm (fio) values ($1) returning id",
		pm.Fio).Scan(&pm.Id)
	if err != nil {
		panic(err)
	}
	return pm, err
}

func GetPm() ([]models.Teacher, error) {
	db := createConnectin()
	defer db.Close()
	rows, err := db.Query("select * from pm")
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	pmAll := []models.Teacher{}

	for rows.Next() {
		p := models.Teacher{}
		err := rows.Scan(&p.Id, &p.Fio)
		if err != nil {
			fmt.Println(err)
			continue
		}
		pmAll = append(pmAll, p)
	}
	sort.Slice(pmAll, func(i, j int) bool {
		return pmAll[i].Id < pmAll[j].Id
	})
	return pmAll, err
}

func DeletePm(id int) error {
	db := createConnectin()
	defer db.Close()
	_, err := db.Exec("delete from pm values where id = $1", id)
	if err != nil {
		panic(err)
	}
	return err
}

func UpdatePm(pm models.Teacher) (models.Teacher, error) {
	db := createConnectin()
	defer db.Close()
	if _, err := db.Exec("update pm set Fio = $2 where id = $1",
		pm.Id, pm.Fio);
		err != nil {
		return pm, err
	}
	return pm, nil
}

func InsertReviewer(reviewer models.Teacher) (models.Teacher, error) {
	db := createConnectin()
	defer db.Close()
	err := db.QueryRow("insert into reviewer (fio) values ($1) returning id",
		reviewer.Fio).Scan(&reviewer.Id)
	if err != nil {
		panic(err)
	}
	return reviewer, err
}

func GetReviewer() ([]models.Teacher, error) {
	db := createConnectin()
	defer db.Close()
	rows, err := db.Query("select * from reviewer")
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	reviewerAll := []models.Teacher{}

	for rows.Next() {
		p := models.Teacher{}
		err := rows.Scan(&p.Id, &p.Fio)
		if err != nil {
			fmt.Println(err)
			continue
		}
		reviewerAll = append(reviewerAll, p)
	}
	sort.Slice(reviewerAll, func(i, j int) bool {
		return reviewerAll[i].Id < reviewerAll[j].Id
	})
	return reviewerAll, err
}

func DeleteReviewer(id int) error {
	db := createConnectin()
	defer db.Close()
	_, err := db.Exec("delete from reviewer values where id = $1", id)
	if err != nil {
		panic(err)
	}
	return err
}

func UpdateReviewer(reviewer models.Teacher) (models.Teacher, error) {
	db := createConnectin()
	defer db.Close()
	if _, err := db.Exec("update reviewer set Fio = $2 where id = $1",
		reviewer.Id, reviewer.Fio);
		err != nil {
		return reviewer, err
	}
	return reviewer, nil
}

func InsertSpecialty(specialty models.Specialyty) (models.Specialyty, error) {
	db := createConnectin()
	defer db.Close()
	err := db.QueryRow("insert into specialty (name) values ($1) returning id",
		specialty.Name).Scan(&specialty.Id)
	if err != nil {
		panic(err)
	}
	return specialty, err
}

func GetSpecialty() ([]models.Specialyty, error) {
	db := createConnectin()
	defer db.Close()
	rows, err := db.Query("select * from specialty")
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	specialytyAll := []models.Specialyty{}

	for rows.Next() {
		p := models.Specialyty{}
		err := rows.Scan(&p.Id, &p.Name)
		if err != nil {
			fmt.Println(err)
			continue
		}
		specialytyAll = append(specialytyAll, p)
	}
	sort.Slice(specialytyAll, func(i, j int) bool {
		return specialytyAll[i].Id < specialytyAll[j].Id
	})
	return specialytyAll, err
}

func DeleteSpecialty(id int) error {
	db := createConnectin()
	defer db.Close()
	_, err := db.Exec("delete from specialty values where id = $1", id)
	if err != nil {
		panic(err)
	}
	return err
}

func UpdateSpecialyty(specialyty models.Specialyty) (models.Specialyty, error) {
	db := createConnectin()
	defer db.Close()
	if _, err := db.Exec("update specialty set name = $2 where id = $1",
		specialyty.Id, specialyty.Name);
		err != nil {
		return specialyty, err
	}
	return specialyty, nil
}

func GetDiplomWithIfo(id int) (models.DiplomWithInfo, error) {
	db := createConnectin()
	defer db.Close()
	p := models.DiplomWithInfo{}
	err := db.QueryRow("select diplom.Id ,diplom.Fio ,diplom.Topic ,diplom.Completion ,diplom.Score ,diplom.Deadline ,diplom.Queuenumber ,diplom.PmId ,p.fio ,diplom.NormcontrollerId , n.fio ,diplom.ReviewerId ,r.fio ,diplom.ChairmanId ,chairman.fio ,diplom.DiplomorderId ,d.name ,d.dateorder ,diplom.SpecialtyId ,s.name ,CommissionId ,c.fio ,diplom.Execution ,diplom.Type ,diplom.CommissionComment ,diplom.Time, diplom.ordernumber from diplom join chairman on diplom.chairmanid = chairman.id join commission c on diplom.commissionid = c.id join diplomorder d on diplom.diplomorderid = d.id join normcontroller n on diplom.normcontrollerid = n.id join pm p on diplom.pmid = p.id join reviewer r on diplom.reviewerid = r.id join specialty s on diplom.specialtyid = s.id where diplom.id = $1 limit 1", id).Scan(
		&p.Id, &p.Fio, &p.Topic, &p.Completion, &p.Score, &p.Deadline, &p.Queuenumber, &p.PmId, &p.Pm, &p.NormcontrollerId, &p.Normcontroller, &p.ReviewerId, &p.Reviewer, &p.ChairmanId, &p.Chairman, &p.DiplomorderId, &p.Diplomorder, &p.DiplomorderDate, &p.SpecialtyId, &p.Specialty, &p.CommissionId, &p.Commission, &p.Execution, &p.Type, &p.CommissionComment, &p.Time, &p.Ordernumber)
	if err != nil {
		panic(err)
	}
	return p, err
}
