"use strict";
Object.defineProperty(exports,"__esModule",{value:true});
var Type;
(function (Type) {
 Type["ObjectId"]="ObjectId";
 Type["Date"]="date";
 Type["Boolean"]="boolean";
 Type["Number"]="number";
 Type["Integer"]="integer";
 Type["String"]="string";
 Type["Text"]="text";
 Type["Object"]="object";
 Type["Array"]="array";
 Type["Primitives"]="primitives";
 Type["Binary"]="binary";
})(Type=exports.Type||(exports.Type={}));
var Format;
(function (Format) {
 Format["Currency"]="currency";
 Format["Percentage"]="percentage";
 Format["Email"]="email";
 Format["Url"]="url";
 Format["Phone"]="phone";
 Format["Fax"]="fax";
 Format["IPv4"]="ipv4";
 Format["IPv6"]="ipv6";
})(Format=exports.Format||(exports.Format={}));
var StatusCode;
(function (StatusCode) {
 StatusCode[StatusCode["DataNotFound"]=0]="DataNotFound";
 StatusCode[StatusCode["Success"]=1]="Success";
 StatusCode[StatusCode["Error"]=2]="Error";
 StatusCode[StatusCode["DuplicateKeyError"]=3]="DuplicateKeyError";
 StatusCode[StatusCode["DataVersionError"]=4]="DataVersionError";
 StatusCode[StatusCode["DataCorruptError"]=5]="DataCorruptError";
 StatusCode[StatusCode["ExternalError"]=6]="ExternalError";
})(StatusCode=exports.StatusCode||(exports.StatusCode={}));
var Status;
(function (Status) {
 Status[Status["DataNotFound"]=0]="DataNotFound";
 Status[Status["Success"]=1]="Success";
 Status[Status["Error"]=2]="Error";
 Status[Status["DataVersionError"]=4]="DataVersionError";
})(Status=exports.Status||(exports.Status={}));
