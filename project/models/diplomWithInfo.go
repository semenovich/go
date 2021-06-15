package models

import "time"

type DiplomWithInfo struct{
	Id int
	Fio string
	Topic string
	Completion int
	Score int
	Deadline *time.Time
	Queuenumber int
	PmId int
	Pm string
	NormcontrollerId int
	Normcontroller string
	ReviewerId int
	Reviewer string
	ChairmanId int
	Chairman string
	DiplomorderId int
	Diplomorder string
	DiplomorderDate *time.Time
	SpecialtyId int
	Specialty string
	CommissionId int
	Commission string
	Execution *time.Time
	Type int
	CommissionComment string
	Time int
	Ordernumber int
}