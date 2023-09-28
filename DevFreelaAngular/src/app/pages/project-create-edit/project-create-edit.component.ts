import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProject } from 'src/app/shared/interfaces/IProject';
import { ProjectCreateEditService } from './services/project-create-edit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { msg } from 'src/app/shared/utils/msg';
import Swal from 'sweetalert2';
import { helpers } from 'src/app/shared/utils/helpers';


@Component({
  selector: 'app-project-create-edit',
  templateUrl: './project-create-edit.component.html',
  styleUrls: ['./project-create-edit.component.scss']
})
export class ProjectCreateEditComponent implements OnInit {
  id: string;
  screenType: 'create' | 'edit';

  msg = msg;
  helpers = helpers;

  ProjectCreateEditForm: FormGroup = this.fb.group({
    title : ['', [Validators.required]],
    totalcost: ['', [Validators.required]],
    description: ['', [Validators.required]],
   
  })
  registerForm: any;

  constructor(private router: Router, private projectCreateEditService: ProjectCreateEditService, private fb: FormBuilder) {
    this.id = history.state.id;
    this.screenType = this.id ? 'edit' : 'create';
  }

 

  ngOnInit(): void {
    this.setScreenTypeTexts();
    this.fillInputs();
  }

  createOrEdit() {
    if(this.ProjectCreateEditForm.valid) {

      let payload: IProject = this.ProjectCreateEditForm.value;
      payload.idClient = localStorage.getItem("idClient");

  
      if(this.screenType === 'create'){
        this.projectCreateEditService.postProject(payload)
          .subscribe(response => {
            alert('Cadastrado com sucesso!');
            this.router.navigateByUrl('list');
          })
      }
  
      if(this.screenType === 'edit'){
        this.projectCreateEditService.putProject(payload, this.id)
        .subscribe(response => {
          alert('Editado com sucesso!');
          this.router.navigateByUrl('list');
        })
      }
    }else {
      this.ProjectCreateEditForm.markAllAsTouched
    }
   
  }

  fillInputs() {
    if (this.screenType === 'edit') {
      this.projectCreateEditService.getProjectsById(this.id).subscribe((project: IProject) => {
        this.ProjectCreateEditForm.patchValue({
          title: project.title,
          totalcost: project.totalCost,
          description: project.description
        })
       
      })
    
    }
  }


title: string = '';
actionButtonText: string = '';

  setScreenTypeTexts() {
   
    // MODO CRIAR
    if (this.screenType == 'create') {
      this.title = "Vamos cadastrar seu novo projeto!";
      this.actionButtonText = "Cadastrar";
    }

    // MODO EDITAR
    if (this.screenType == 'edit') {
      this.title = "Editar projeto";
      this.actionButtonText = "Salvar";
     
    }
  }

  

  }
