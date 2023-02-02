import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  productType = ["Barand New", "Used", "Refurbished", "Fresh", "Freezing"]
  productForm !: FormGroup;
  constructor (private formBuilder : FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>) {}
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      catageory: ['', Validators.required],
      date: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
    })
  }
  addProduct () {
    if (this.productForm.valid) {
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next: (res) => {
          alert("product added successflly.");
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error: ()=> {
          alert("error while adding the product.")
        }
      })
    }
  }
}
