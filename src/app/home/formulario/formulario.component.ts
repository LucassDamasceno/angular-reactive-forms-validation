import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


declare var $: any;

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  formulario: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      sobrenome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      nascimento: ['', [Validators.required, Validators.minLength(8)]],
      celular: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required, Validators.minLength(10)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      endereco: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      numero: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6), this.validarSenha]],
      confirmSenha: ['', [Validators.required, Validators.minLength(6), this.validarConfirmSenha]]
    });
  }

  validarSenha(control: FormControl) {
    const field = control.root.get('confirmSenha');
    if (field !== null) {
      const value = field.value;
      field.setValue(value);
    }
  }

  validarConfirmSenha(control: FormControl) {
    const field = control.root.get('senha');
    if (field !== null) {
      if (field.value === control.value) {
        return null;
      } else {
        return { custon: true };
      }
    }
  }


  buscarCep(cep) {
    this.formulario.controls.cep.markAsTouched();
    this.formulario.controls.cep.setValue(cep);
    cep = cep.replace(/[^0-9]/g, '');
    if (cep.toString().length === 8) {
      this.http.get('https://viacep.com.br/ws/' + cep + '/json/').subscribe((dadosCep: any) => {
        this.formulario.controls.endereco.setValue(dadosCep.logradouro);
        this.formulario.controls.bairro.setValue(dadosCep.bairro);
        this.formulario.controls.cidade.setValue(dadosCep.localidade);
        this.formulario.controls.estado.setValue(dadosCep.uf);
      })
    }
  }

  validarFormulaio() {
    if (this.formulario.valid) {
      $('#modal-success').appendTo('body').modal('show');
    } else {
      this.formulario.markAllAsTouched();
    }
  }




  updateFieldValue(campo, value) {
    this.formulario.controls[campo].setValue(value)
    this.formulario.controls[campo].markAsTouched();
  }

  aplicaCssErro(campo) {
    return { 'is-invalid': this.formulario.get(campo).invalid && this.formulario.get(campo).touched }
  }
}

