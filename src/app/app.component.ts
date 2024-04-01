import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { Product } from './models/product';
import { Store } from './models/store';
import { StoresService } from './services/stores.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Angular-exercise-2';
  products: Product[] = [];
  stores: Store[] = [];
  showProductForm: boolean = false;
  showUpdateProductForm: boolean = false;
  showFilteredProducts: boolean = false;
  searchKeyword: string = '';
  filteredProducts: Product[] = [];

  showStoreForm: boolean = false;
  showUpdateStoreForm: boolean = false;

  emptyProduct: Product = { id: undefined, name: '', description: '', ratings: [], createdOn: new Date() }
  product: Product = { ...this.emptyProduct };
  producttemp: Product = { ...this.emptyProduct };

  emptyStore: Store = { id: undefined, name: '', country: '', city: '', monthlyIncome: 0, ownerName: '', activeSince: new Date() }
  store: Store = { ...this.emptyStore };
  storetemp: Store = { ...this.emptyStore };
  ratingstemp: string = '';

  constructor(private productService: ProductsService, private storeService: StoresService) { }

  ngOnInit() {
    this.getAllProducts();
    this.getAllStores();
  }


  getAllProducts() {
    this.productService.getAllProducts().subscribe(products => {
      this.filteredProducts = products;
    })
  }

  getAllStores() {
    this.storeService.getAllStores().subscribe(stores => {
      this.stores = stores;
    })
  }

  toggleProductForm() {
    this.showProductForm = !this.showProductForm;
  }

  toggleStoreForm() {
    this.showStoreForm = !this.showStoreForm;
  }

  GetValueInTemp(product: Product) {
    this.producttemp = product;
  }

  GetValueInStoreTemp(store: Store) {
    this.storetemp = store;
  }

  toggleProductUpdateForm(product: Product) {
    this.showUpdateProductForm = !this.showUpdateProductForm;
    this.GetValueInTemp(product)
  }

  toggleProductFiltered(product: Product) {
    this.showFilteredProducts = !this.showFilteredProducts;
    this.getAllProducts()
  }

  toggleStoreUpdateForm(store: Store) {
    this.showUpdateStoreForm = !this.showUpdateStoreForm;
    this.GetValueInStoreTemp(store)
  }

  createProduct() {
    const araytemp: number[] = [];
    this.ratingstemp.trim().split(',').forEach(item => {
      araytemp.push(+item)
    });
    this.product.ratings = araytemp;
    this.productService.createProduct(this.product).subscribe(() => {
      this.getAllProducts();
      this.product = { ...this.emptyProduct };
    })
  }

  createStore() {
    this.storeService.createStore(this.store).subscribe(() => {
      this.getAllStores();
      this.store = { ...this.emptyStore };
    })
  }

  updateProduct(product: Product) {

    const araytemp: number[] = [];
    this.ratingstemp.trim().split(',').forEach(item => {
      araytemp.push(+item)
    });
    product.ratings = araytemp;
    this.productService.updateProduct(product).subscribe(() => {
      this.getAllProducts();
      this.ratingstemp = '';
    })
  }

  updateStore(store: Store) {
    this.storeService.updateStore(store).subscribe(() => {
      this.getAllStores();
    })
  }

  deleteProduct(id?: string) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.getAllProducts();
    })
  }

  deleteStore(id?: string) {
    this.storeService.deleteStore(id).subscribe(() => {
      this.getAllStores();
    })
  }

  searchProducts(searchKeyword: string) {
    if (searchKeyword.trim() !== '') {
      this.productService.getProductsKeywords(searchKeyword.trim())
        .subscribe(products => {
          this.filteredProducts = products;
        });
    }
  }

  getProductsKeywords(keyword?: string) {
    this.productService.getProductsKeywords(keyword).subscribe(products => {
      this.products = products;
    })
  }

  orderProductsDes() {
    this.productService.getOrderDes()
      .subscribe(products => {
        this.filteredProducts = products;
      });
  }

  orderProductsAsc() {
    this.productService.getOrderAsc()
      .subscribe(products => {
        this.filteredProducts = products;
      });
  }

}
