import {FormGroup} from '@angular/forms';
import {SuperForm} from 'angular-super-validator';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ValidationService {


  defaultErrors = {
    required: 'Не заполнено поле {{name}}',
    maxlength: 'Поле {{name}} не должно быть больше {{maxlength}} символов',
    minlength: 'Поле {{name}} не должно быть меньше {{minlength}} символов',
    minutes: 'В поле {{name}} не верно указаны минуты',
  };

  propNames = {
    Password: 'Пароль',
    AllowEmployee: 'Допускающий',
    PlanQty: 'План. кол-во'
  };

  errors = {
    Username: {
      required: 'Не заполнено поле Логин',
      pattern: 'Некорректный логин. Можно использовать только латинские буквы, цифры, точку и знак нижнего подчёркивания'
    },
    Description: {
      required: 'Не заполнено поле Описание'
    },
    OrganizationId: {
      required: 'Не выбрана Организация'
    },
    Password: {
      required: 'Не заполнено поле Пароль'
    },
    EmployeeId: {
      required: 'Не выбран Сотрудник'
    },
    Fullname: {
      required: 'Не заполнено поле ФИО'
    },
    TechPlaceId: {
      required: 'Не выбрано Техническое место'
    },
    WorkCategoryId: {
      required: 'Не выбран Вид работы'
    },
    Status: {
      required: 'Не выбран Статус'
    },
    Priority: {
      required: 'Не выбран Приоритет'
    },
    ResourceType: {
      required: 'Не выбран Ответственный'
    },
    WorkTypeId: {
      required: 'Не выбран Тип работы'
    },
    MaterialId: {
      required: 'Не выбран МТР'
    },
    PlanQty: {
      required: 'Не заполнено Плановое количество'
    },
    BalanceUnit: {
      maxlength: 'Поле Балансовая единица не должно быть больше 4 символов',
    },
    PersonnelNumber: {
      required: 'Не заполнено поле Табельный номер'
    },
    TemplateName: {
      required: 'Не заполнено поле Название шаблона'
    }
  };

  maskedTimeValidator(control) {
    if (control.value) {
      const timeArray = control.value.split('');
      if (control.value.length < 4) {
        return {minlength: {requiredLength: 4}};
      }
      const minutes = parseInt(timeArray[timeArray.length - 2] + timeArray[timeArray.length - 1], 10);
      if (minutes > 59 || minutes < 0) {
        return {minutes: false};
      }
    }
    return null;
  }

  constructor(private toastr: ToastrService) {
  }

  showValidateErrors(form: FormGroup, propErrors: any) {
    const errors: string[] = [];
    const invalidProps = SuperForm.getAllErrors(form);
    for (const prop in invalidProps) {
      for (const err in invalidProps[prop]) {
        if (propErrors && prop in propErrors && err in propErrors[prop]) {
          errors.push(propErrors[prop][err]);
        } else if (prop in this.errors && err in this.errors[prop]) {
          errors.push(this.errors[prop][err]);
        } else {
          let error = this.defaultErrors[err].replace('{{name}}', this.propNames[prop] || prop);
          if (invalidProps[prop].maxlength) {
            error = error.replace('{{maxlength}}', invalidProps[prop].maxlength.requiredLength);
          }
          if (invalidProps[prop].minlength) {
            error = error.replace('{{minlength}}', invalidProps[prop].minlength.requiredLength);
          }
          errors.push(error);
        }
      }
    }
    this.toastr.error(errors.join('<br />'), 'Внимание!', {enableHtml: true});
  }

  validateAndSave(form: FormGroup, cb: Function, error: any = null, propErrors: any = null) {
    if (error && typeof error === 'object') {
      propErrors = error;
      error = null;
    }
    if (form.valid) {
        cb();
    } else {
      if (error) {
        error();
      } else {
        this.showValidateErrors(form, propErrors);
      }
    }
  }

  valueFormTrimmer(value: any, fields: string[]) {
    const trimValueForm = Object.assign({}, value);

    fields.forEach(field => {
      if (trimValueForm[field]) {
        trimValueForm[field] = trimValueForm[field].toString().trim();
      }
    });

    return trimValueForm;
  }
}
