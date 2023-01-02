import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user-service.service';


export class ImageItem {
  image: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  items = new Array<ImageItem>();
  selectedIndex: number = 0;

  title = 'MicroGroove';
  loading: boolean = false;
  userForm: any;
  imgData: any = "";
  imageObject: any = [
  ];


  constructor(private fb: FormBuilder, private userService: UserService, private sanitizer: DomSanitizer) {
    this.selectedIndex = 0;
  }

  ngOnInit() {
    this.initializeForm();
  }
  initializeForm() {
    this.userForm = this.fb.group({
      name: new FormControl('', [Validators.required])
    }); new FormGroup({

    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  searchName(formValue: any) {
    this.loading = true;
    this.userService.getData(formValue.name).subscribe(((result: any) => {
      let objectURL = URL.createObjectURL(result)
      this.loading = false;
      let imgItem = new ImageItem();
      imgItem.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      this.items.push(imgItem)
      this.selectedIndex=this.items.length - 1;
      this.imgData = this.items[this.items.length - 1].image;

    }), (error: any) => {
      this.loading = false;
      alert("Unable to load Image. Please try later");
      console.log("Log Error", error);
    });
  }

  onNextClick() {

    ++this.selectedIndex;
    if (!(this.items[this.selectedIndex] === undefined)) {
      this.imgData = this.items[this.selectedIndex].image
    }else{
      --this.selectedIndex;
    }

  }
  onPrevClick() {

    --this.selectedIndex;
    if (!(this.items[this.selectedIndex] === undefined)) {
      this.imgData = this.items[this.selectedIndex].image
    }else{
      ++this.selectedIndex;
    }
  }





}
