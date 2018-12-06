"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var app = require("application");
var router_1 = require("@angular/router");
var user_1 = require("../user");
var keychain_card_1 = require("../keychain-card");
var firebase = require("nativescript-plugin-firebase");
var firebaseWebApi = require("nativescript-plugin-firebase/app");
var ZXing = require("nativescript-zxing");
var ImageSource = require("image-source");
var KeychainCard = /** @class */ (function () {
    function KeychainCard(barcodeId, barcodeFormat, cardLoc, cardName) {
        this.barcodeId = barcodeId;
        this.barcodeFormat = barcodeFormat;
        this.cardLoc = cardLoc;
        this.cardName = cardName;
    }
    return KeychainCard;
}());
var CardsComponent = /** @class */ (function () {
    function CardsComponent(router, user, keychaincardclass) {
        this.router = router;
        this.user = user;
        this.keychaincardclass = keychaincardclass;
        this.items = [];
        this.result = null;
        this.index = 0;
        this.barcodeData = "";
        this.barcodeFormat = "";
        this.barcodes = [[]];
        this.individualBarcode = [];
        this.cardsForList = [];
    }
    CardsComponent.prototype.ngOnInit = function () {
        var _this = this;
        firebase.getValue('/users/' + this.user.getUserId() + '/Keychains')
            .then(function (result) {
            //function to get length of keychains
            _this.result = result;
            // console.log(this.result);
            var length = _this.getLength();
            console.log("i am here");
            _this.checkKeychains(length);
            // while(this.index!=length){
            // }
        })
            .catch(function (error) { return console.log("Error: " + error); });
        // setTimeout(()=>{
        // }, 1000);
    };
    CardsComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    CardsComponent.prototype.navigateViewCard = function () {
        this.router.navigate(["/view-card"]);
    };
    CardsComponent.prototype.onItemTap = function (args) {
        console.log("Item Tapped at cell index: " + args.index);
        this.keychaincardclass.setBarcodeId(this.barcodes[args.index][0]);
        this.keychaincardclass.setBarcodeFormat(this.barcodes[args.index][1]);
        this.keychaincardclass.setCardLocation(this.barcodes[args.index][2]);
        this.keychaincardclass.setCardName(this.barcodes[args.index][3]);
        this.router.navigate(["/view-card"]);
    };
    CardsComponent.prototype.getLength = function () {
        var length = 0;
        for (var item in this.result.value) {
            this.items.push(item);
            length++;
        }
        console.log("length is " + length);
        return length;
    };
    CardsComponent.prototype.getKeychains = function (length) {
        var _this = this;
        // for(var item in this.result.value){
        firebase.getValue('/users/' + this.user.getUserId() + '/Keychains/' + this.items.pop())
            .then(function (result) {
            console.log("get keychains");
            _this.individualBarcode = [];
            _this.individualBarcode.push(result.value.Data);
            _this.individualBarcode.push(result.value.Format);
            _this.individualBarcode.push(result.value.cardLocation);
            _this.individualBarcode.push(result.value.cardName);
            _this.barcodes.unshift(_this.individualBarcode);
            _this.index++;
            _this.checkKeychains(length);
        });
        // }
    };
    CardsComponent.prototype.checkKeychains = function (length) {
        if (this.index < length) {
            console.log("checkKeychains");
            this.getKeychains(length);
        }
        else {
            console.log("after promise");
            for (var i = 0; i < this.barcodes.length; i++) {
                this.cardsForList.push(new KeychainCard(this.barcodes[i][0], this.barcodes[i][1], this.barcodes[i][2], this.barcodes[i][3]));
                for (var j = 0; j < this.barcodes[i].length; j++) {
                    console.log();
                    console.log("Keychain " + i + ": " + this.barcodes[i][j]);
                }
            }
        }
        // return 1;
    };
    tslib_1.__decorate([
        core_1.ViewChild("barcodeImg"),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], CardsComponent.prototype, "barcodeImg", void 0);
    CardsComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "Cards",
            moduleId: module.id,
            styleUrls: ["./cards.component.css"],
            templateUrl: "./cards.component.html"
        }),
        tslib_1.__metadata("design:paramtypes", [router_1.Router,
            user_1.User,
            keychain_card_1.KeychainCardClass])
    ], CardsComponent);
    return CardsComponent;
}());
exports.CardsComponent = CardsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FyZHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNDQUF5RTtBQUN6RSxpQ0FBbUM7QUFFbkMsMENBQXlDO0FBR3pDLGdDQUErQjtBQUUvQixrREFBcUQ7QUFFckQsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDekQsSUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDbkUsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDNUMsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRTVDO0lBQ0ksc0JBQW1CLFNBQWlCLEVBQ2pCLGFBQXFCLEVBQ3JCLE9BQWUsRUFDZixRQUFnQjtRQUhoQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBQ3JCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixhQUFRLEdBQVIsUUFBUSxDQUFRO0lBQUksQ0FBQztJQUM1QyxtQkFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBU0Q7SUFVSSx3QkFBb0IsTUFBYyxFQUNkLElBQVUsRUFDVixpQkFBb0M7UUFGcEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBUHhELGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBQzNCLGFBQVEsR0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLHNCQUFpQixHQUFhLEVBQUUsQ0FBQztRQUs3QixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUFBLGlCQStCQztRQTlCRyxR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SSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBOUR3QjtRQUF4QixnQkFBUyxDQUFDLFlBQVksQ0FBQzswQ0FBYSxpQkFBVTtzREFBQztJQUp2QyxjQUFjO1FBUDFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsT0FBTztZQUNqQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7WUFDcEMsV0FBVyxFQUFFLHdCQUF3QjtTQUN4QyxDQUFDO2lEQVk4QixlQUFNO1lBQ1IsV0FBSTtZQUNTLGlDQUFpQjtPQVovQyxjQUFjLENBb0UxQjtJQUFELHFCQUFDO0NBQUEsQUFwRUQsSUFvRUM7QUFwRVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEltYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2VcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL3VzZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUluamVjdG9yIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmUvc3JjL3ZpZXcvcmVmc1wiO1xuaW1wb3J0IHsgS2V5Y2hhaW5DYXJkQ2xhc3MgfSBmcm9tIFwiLi4va2V5Y2hhaW4tY2FyZFwiO1xuXG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuY29uc3QgZmlyZWJhc2VXZWJBcGkgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XG5jb25zdCBaWGluZyA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtenhpbmdcIik7XG5jb25zdCBJbWFnZVNvdXJjZSA9IHJlcXVpcmUoXCJpbWFnZS1zb3VyY2VcIik7XG5cbmNsYXNzIEtleWNoYWluQ2FyZCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGJhcmNvZGVJZDogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHB1YmxpYyBiYXJjb2RlRm9ybWF0OiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgcHVibGljIGNhcmRMb2M6IHN0cmluZyxcbiAgICAgICAgICAgICAgICBwdWJsaWMgY2FyZE5hbWU6IHN0cmluZykgeyB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkNhcmRzXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzdHlsZVVybHM6IFtcIi4vY2FyZHMuY29tcG9uZW50LmNzc1wiXSxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2NhcmRzLmNvbXBvbmVudC5odG1sXCJcbn0pXG5cbmV4cG9ydCBjbGFzcyBDYXJkc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwdWJsaWMgY2FyZHNGb3JMaXN0OiBBcnJheTxLZXljaGFpbkNhcmQ+O1xuXG4gICAgQFZpZXdDaGlsZChcImJhcmNvZGVJbWdcIikgYmFyY29kZUltZzogRWxlbWVudFJlZjtcbiAgICBiYXJjb2RlRGF0YTogc3RyaW5nID0gXCJcIjtcbiAgICBiYXJjb2RlRm9ybWF0OiBzdHJpbmcgPSBcIlwiO1xuICAgIGJhcmNvZGVzOiBbc3RyaW5nW11dPSBbW11dOyBcbiAgICBpbmRpdmlkdWFsQmFyY29kZTogc3RyaW5nW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB1c2VyOiBVc2VyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUga2V5Y2hhaW5jYXJkY2xhc3M6IEtleWNoYWluQ2FyZENsYXNzKSB7XG4gICAgICAgIHRoaXMuY2FyZHNGb3JMaXN0ID0gW107XG4gICAgfVxuICAgIFxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3VzZXJzLycrdGhpcy51c2VyLmdldFVzZXJJZCgpKycvS2V5Y2hhaW5zJylcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGZvcih2YXIgaXRlbSBpbiByZXN1bHQudmFsdWUpe1xuICAgICAgICAgICAgICAgIGZpcmViYXNlLmdldFZhbHVlKCcvdXNlcnMvJyt0aGlzLnVzZXIuZ2V0VXNlcklkKCkrJy9LZXljaGFpbnMvJytpdGVtKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdD0+e1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRpdmlkdWFsQmFyY29kZSA9IFtdIDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRpdmlkdWFsQmFyY29kZS5wdXNoKHJlc3VsdC52YWx1ZS5EYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRpdmlkdWFsQmFyY29kZS5wdXNoKHJlc3VsdC52YWx1ZS5Gb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGl2aWR1YWxCYXJjb2RlLnB1c2gocmVzdWx0LnZhbHVlLmNhcmRMb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kaXZpZHVhbEJhcmNvZGUucHVzaChyZXN1bHQudmFsdWUuY2FyZE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhcmNvZGVzLnVuc2hpZnQodGhpcy5pbmRpdmlkdWFsQmFyY29kZSk7XG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcikpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG5cbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IHRoaXMuYmFyY29kZXMubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXJkc0Zvckxpc3QucHVzaChuZXcgS2V5Y2hhaW5DYXJkKHRoaXMuYmFyY29kZXNbaV1bMF0sIHRoaXMuYmFyY29kZXNbaV1bMV0sIHRoaXMuYmFyY29kZXNbaV1bMl0sIHRoaXMuYmFyY29kZXNbaV1bM10pKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZm9yKHZhciBqID0wO2o8dGhpcy5iYXJjb2Rlc1tpXS5sZW5ndGg7aisrKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJLZXljaGFpbiBcIitpK1wiOiBcIit0aGlzLmJhcmNvZGVzW2ldW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDApO1xuXG4gICAgfVxuXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcbiAgICAgICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG4gICAgbmF2aWdhdGVWaWV3Q2FyZCgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3ZpZXctY2FyZFwiXSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uSXRlbVRhcChhcmdzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSXRlbSBUYXBwZWQgYXQgY2VsbCBpbmRleDogXCIgKyBhcmdzLmluZGV4KTtcbiAgICAgICAgdGhpcy5rZXljaGFpbmNhcmRjbGFzcy5zZXRCYXJjb2RlSWQodGhpcy5iYXJjb2Rlc1thcmdzLmluZGV4XVswXSk7XG4gICAgICAgIHRoaXMua2V5Y2hhaW5jYXJkY2xhc3Muc2V0QmFyY29kZUZvcm1hdCh0aGlzLmJhcmNvZGVzW2FyZ3MuaW5kZXhdWzFdKTtcbiAgICAgICAgdGhpcy5rZXljaGFpbmNhcmRjbGFzcy5zZXRDYXJkTG9jYXRpb24odGhpcy5iYXJjb2Rlc1thcmdzLmluZGV4XVsyXSk7XG4gICAgICAgIHRoaXMua2V5Y2hhaW5jYXJkY2xhc3Muc2V0Q2FyZE5hbWUodGhpcy5iYXJjb2Rlc1thcmdzLmluZGV4XVszXSk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3ZpZXctY2FyZFwiXSk7XG4gICAgfVxuXG59Il19

