"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Status;
(function (Status) {
  Status["Active"]="A";
  Status["Inactive"]="I";
  Status["Deactivated"]="D";
  Status["Deleted"]="D";
})(Status=exports.Status || (exports.Status={}));
var Gender;
(function (Gender) {
  Gender["Male"]="M";
  Gender["Female"]="F";
})(Gender=exports.Gender || (exports.Gender={}));
var Type;
(function (Type) {
  Type["ObjectId"]="ObjectId";
  Type["date"]="date";
  Type["time"]="time";
  Type["datetime"]="datetime";
  Type["boolean"]="boolean";
  Type["number"]="number";
  Type["integer"]="integer";
  Type["string"]="string";
  Type["text"]="text";
  Type["object"]="object";
  Type["array"]="array";
  Type["primitives"]="primitives";
  Type["binary"]="binary";
})(Type=exports.Type || (exports.Type={}));
var Format;
(function (Format) {
  Format["currency"]="currency";
  Format["percentage"]="percentage";
  Format["email"]="email";
  Format["url"]="url";
  Format["phone"]="phone";
  Format["fax"]="fax";
  Format["ipv4"]="ipv4";
  Format["ipv6"]="ipv6";
})(Format=exports.Format || (exports.Format={}));
