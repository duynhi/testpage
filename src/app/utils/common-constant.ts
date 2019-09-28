export const API_URLS = {
    authen: 'mypage/authenticate',
    resetPass: 'mypage/password/reset',
    settingPass: 'mypage/password/regist',
    myPageRegist: 'mypage/regist',
    messageTop: 'message/list',
    display: 'mypage/display',
    getListKeiyaku: 'keiyaku/list',
    getListProduct: 'product/list',
    deleteKeiyaku: 'keiyaku/delete',
    getListAgent: 'agent/list',
    saveAgent: 'agent/save',
    saveProduct: 'keiyaku/save',
    getProduct: 'keiyaku/get',
    deleteFile: 'keiyaku/file/delete',
    addFile: 'keiyaku/file/save',
    getFile: 'keiyaku/file/get',
    getListPdf: 'pdf/list',
    saveFamily:  'mypage/family/save',
    deleteFamily: 'mypage/family/delete',
    updateMail: 'mypage/mail/change',
    downPdf: 'pdf/get',
    deleteAgent: 'agent/delete',
    saveInsurance: 'procedure/save',
    authenChangeMail: 'mypage/mail/authenticateChangeMail',
    authenAddAgent: 'mypage/agent/add',
    RegistUsingHistory: 'usingHistory/regist',
    address: 'mypage/address/get'
};


export const CALENDARJP = {
    firstDayOfWeek: 1,
    dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
    dayNamesMin: ['日', '月', '火', '水', '木', '金', '土'],
    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    today: '今日',
    clear: 'クリア'
};

export const HARAIKATA = [
    {
        value: '1',
        label: '年払'
    },
    {
        value: '2',
        label: '半年払'
    },
    {
        value: '4',
        label: '前納'
    },
    {
        value: '6',
        label: '一括払'
    },
    {
        value: '9',
        label: 'その他'
    },

];


export const MESSAGE = {
    emailInvalid: 'メールアドレス（ログインID）に誤りがあります。',
    forgotPassEmailInvalid: 'メールアドレスに誤りがあります。',
    notRegistEmail: '入力されたメールアドレスは登録されていません。',
    idRequire: 'ID（メールアドレス）が未入力です。',
    emailRequire: 'メールアドレス（ログインID）が未入力です。',
    passRequire: 'パスワードが未入力です。',
    tempPassRequire: '現在のパスワードが未入力です。',
    newPassRequire: '新しいパスワードが未入力です。',
    newPassPolicy: '新しいパスワードは英数字を含む8字以上で入力してください。',
    newPassEqualUser: '新しいパスワードはメールアドレス（ログインID）と同じには出来ません。',
    confirmPassRequire: '新しいパスワード（確認）が未入力です。',
    passNotMatch: '新しいパスワードと新しいパスワード(確認)が一致しません。',
    sexRequire: '性別が未入力です。',
    dobRequire: '生年月日が未入力です。',
    firstNameRequire: '氏名(名)が未入力です。',
    lastNameRequire: '氏名(姓)が未入力です。',
    nameMaxLength50: '氏名は50字以内で入力してください。',
    firstNameMaxLength50: '氏名(名)は50字以内で入力してください。',
    lastNameMaxLength50: '氏名(姓)は50字以内で入力してください。',
    firstNameKanaRequire: 'ふりがな(めい)が未入力です。',
    lastNameKanaRequire: 'ふりがな(せい)が未入力です。',
    lastNameKanaFormatIncorrect: 'ふりがな(せい)に誤りがあります。',
    firstNameKanaFormatIncorrect: 'ふりがな(めい)に誤りがあります。',
    phoneMaxLength: '電話番号は50字以内で入力してください。',
    streetMaxLength: '市区町村丁目・番地は400字以内で入力してください。',
    apartmentMaxLength: '建物名は200字以内で入力してください。',
    companyRequire: '保険会社名が未入力です。',
    nameBookRequire: '契約者が未入力です。',
    categoryRequire: '連絡先が未入力です。',
    hokenNameRequire: '保険種類（商品名）が未入力です。',
    statusRequire: '契約状況が未入力です。',
    agentRequire: '連絡先が未入力です。',
    relationRequire: '続柄が未入力です。',
    hokenBunruiRequire: '保障（補償）の目的が未入力です。',
};
