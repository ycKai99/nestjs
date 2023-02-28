/* Restructuring of the code so it becomes

 "Standard fingerprint class" => "zkteco fingerprint class"



interface StandardFingerprintInterface
{
    registerNewFingerPrint(fp:string)
    verifyFp()
}

class StandardFingerprint implements StandardFingerprintInterface
{
    registerNewFingerPrint(fp:string){}
    verifyFp(){}
}
class ZKTFingerprint extends StandardFingerprint implements StandardFingerprintInterface
{ 
    verifyFp(){
        ...
    }
}
class ABCFingerprint extends StandardFingerprint implements StandardFingerprintInterface
{ 
    verifyFp(){
        ...
    }
}
 */