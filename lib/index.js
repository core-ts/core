"use strict";
Object.defineProperty(exports,"__esModule",{value:true});
var Type;
(function(Type){
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
(function(Format){
  Format["Currency"]="currency";
  Format["Percentage"]="percentage";
  Format["Email"]="email";
  Format["Url"]="url";
  Format["Phone"]="phone";
  Format["Fax"]="fax";
  Format["IPv4"]="ipv4";
  Format["IPv6"]="ipv6";
})(Format=exports.Format||(exports.Format={}));
var Status;
(function(Status){
  Status[Status["DuplicateKey"]=0]="DuplicateKey";
  Status[Status["NotFound"]=0]="NotFound";
  Status[Status["Success"]=1]="Success";
  Status[Status["VersionError"]=2]="VersionError";
  Status[Status["Error"]=4]="Error";
  Status[Status["DataCorrupt"]=8]="DataCorrupt";
})(Status=exports.Status||(exports.Status={}));
