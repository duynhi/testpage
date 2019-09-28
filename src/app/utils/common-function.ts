import { FormGroup } from '@angular/forms';

export class Helper {
    public static displayCssError(formGroup: FormGroup, field: string|Array<string>) {
      return (formGroup.get(field).invalid &&
      (formGroup.get(field).touched || formGroup.get(field).dirty) ) ? 'has-error' : '';
    }

    public static isInt(n) {
      // tslint:disable-next-line: no-bitwise
      return parseInt(n, 10) === n;
  }

    public static filterGender(relation) {
      let listGender = [];
      switch (relation) {
        case '0' :
        case '13' :
        case '16' :
        case '19' :
        case '20' :
          listGender = [
            {value: 'M', label: '男性'},
            {value: 'F', label: '女性'},
          ];
          break;
        case '1':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '14':
        case '17':
        case '21':
        case '22':
          listGender = [
            {value: 'M', label: '男性'},
          ];
          break;
        case '2':
        case '8':
        case '9':
        case '10':
        case '11':
        case '12':
        case '15':
        case '18':
        case '23':
        case '24':
          listGender = [
            {value: 'F', label: '女性'}
          ];
          break;
        case '98':
          listGender = [
            {value: 'B', label: '出生前'},
            // {value: 'N', label: '未設定'}
          ];
          break;
        case '99' :
            listGender = [
              {value: 'M', label: '男性'},
              {value: 'F', label: '女性'},
              {value: 'B', label: '出生前'},
              {value: 'N', label: '未設定'},
            ];
            break;
      }
      return listGender;

    }

    public static filterRelation(gender) {
      let listRelation = [];
      switch (gender) {
        case 'M':
          listRelation = [
            {value: '', label: '以下からご選択ください'},
            {value: '0', label: '本人'},
            {value: '13', label: '子供'},
            {value: '16', label: '孫'},
            {value: '19', label: '親戚'},
            {value: '20', label: '内縁'},
            {value: '1', label: '夫'},
            {value: '3', label: '長男'},
            {value: '4', label: '次男'},
            {value: '5', label: '三男'},
            {value: '6', label: '四男'},
            {value: '7', label: '五男'},
            {value: '14', label: '父'},
            {value: '17', label: '祖父'},
            {value: '21', label: '兄'},
            {value: '22', label: '弟'},
            {value: '99', label: 'その他'},
          ];
          break;
        case 'F':
            listRelation = [
              {value: '', label: '以下からご選択ください'},
              {value: '0', label: '本人'},
              {value: '13', label: '子供'},
              {value: '16', label: '孫'},
              {value: '19', label: '親戚'},
              {value: '20', label: '内縁'},
              {value: '2', label: '妻'},
              {value: '8', label: '長女'},
              {value: '9', label: '次女'},
              {value: '10', label: '三女'},
              {value: '11', label: '四女'},
              {value: '12', label: '五女'},
              {value: '15', label: '母'},
              {value: '18', label: '祖母'},
              {value: '23', label: '姉'},
              {value: '24', label: '妹'},
              {value: '99', label: 'その他'},
            ];
            break;
        case 'B':
          listRelation = [{value: '', label: '以下からご選択ください'}, {value: '98', label: '出生前'}];
          break;
        case 'N':
          listRelation = [{value: '', label: '以下からご選択ください'}, {value: '99', label: 'その他'}];
          break;
      }
      return listRelation;
    }
}
