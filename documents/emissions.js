module.exports = ({ nom, dure, date_emission, animateur, visiteur, chroniqueur, langue }) => {
   const today = new Date();
   if (langue === "fr") {
      return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .text-center {
                text-align: center;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #DC143C;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td class="title"><img  src="F:\PNUD\Projets\Emission\images\logo.jpg"
                               style="width:100%; max-width:156px;"></td>
                            <td>
                               Date: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                                <h2 class="text-center">  L'emission : ${nom} </h2>
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading">
                   <td>Column:</td>
                   <td>Détails des émissions:</td>
                </tr>
                <tr class="item">
                   <td>Nom  : </td>
                   <td>${nom}</td>
                </tr>
                <tr class="item">
                   <td>Durée :</td>
                   <td>${dure}</td>
                </tr>
                <tr class="item">
                    <td>Date d'emission :</td>
                    <td>${date_emission.substring(0, 10)}</td>
                </tr>
                <tr class="item">
                    <td>Animateur :</td>
                    <td>${animateur}</td>
                </tr>
                <tr class="item">
                    <td>Visiteur :</td>
                    <td>${visiteur}</td>
                </tr>
                <tr class="item">
                    <td>Chroniqueur :</td>
                    <td>
                        <table class="table">
                           <tr class="item">
                              <td> Nom :  </td>
                              <td> ${chroniqueur.nom}</td>
                           </tr>
                           <tr class="item">
                              <td> Prenom :  </td>
                              <td>${chroniqueur.prenom} </td>
                           </tr>
                           <tr class="item">
                              <td > Date de naissance :  </td>
                              <td> ${chroniqueur.date_naissance.substring(0, 10)}</td>
                           </tr>
                           <tr class="item">
                              <td> Numero Tel :  </td>
                              <td>${chroniqueur.num_tel} </td>
                           </tr>
                        </table>
                    </td>
                </tr>
             </table>
          </div>
       </body>
    </html>
    `;
   }
   else {
      return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .text-center {
                text-align: center;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: rigth;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: rigth;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #DC143C;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body dir="rtl">
          <div class="invoice-box">
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td class="title"><img  src="logo.jpg"
                               style="width:100%; max-width:156px;"></td>
                            <td>
                               التاريخ :  ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                                <h2 class="text-center">    البرنامج : ${nom}</h2>
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading">
                   <td>الخصائص</td>
                   <td>تفاصيل البرنامج </td>
                </tr>
                <tr class="item">
                   <td>الاسم  : </td>
                   <td>${nom}</td>
                </tr>
                <tr class="item">
                   <td>المدة :</td>
                   <td>${dure}</td>
                </tr>
                <tr class="item">
                    <td>تاريخ العرض :</td>
                    <td>${date_emission.substring(0, 10)}</td>
                </tr>
                <tr class="item">
                    <td>المنشط :</td>
                    <td>${animateur}</td>
                </tr>
                <tr class="item">   
                    <td> الزائر : </td>             
                    <td>${visiteur}</td>

                </tr>
                <tr class="item">
                    <td>المحلل : </td>
                    <td>
                    <table class="table">
                    <tr class="item">
                       <td>  الاسم:  </td>
                       <td> ${chroniqueur.nom}</td>
                    </tr>
                    <tr class="item">
                       <td> اللقب :  </td>
                       <td>${chroniqueur.prenom} </td>
                    </tr>
                    <tr class="item">
                       <td > تاريخ الولادة :  </td>
                       <td> ${chroniqueur.date_naissance.substring(0, 10)}</td>
                    </tr>
                    <tr class="item">
                       <td> رقم الهاتف :  </td>
                       <td>${chroniqueur.num_tel} </td>
                    </tr>
                 </table>
                    </td>
                </tr>
             </table>
          </div>
       </body>
    </html>
    `;
   }

};