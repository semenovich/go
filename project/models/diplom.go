package models

import "time"

type Diplom struct{
	Id int
	Fio string
	Topic string
	Completion int
	Score int
	Deadline *time.Time
	Queuenumber int
	PmId int
	NormcontrollerId int
	ReviewerId int
	ChairmanId int
	DiplomorderId int
	SpecialtyId int
	CommissionId int
	Execution *time.Time
	Type int
	CommissionComment string
	Time int
	Ordernumber int
}