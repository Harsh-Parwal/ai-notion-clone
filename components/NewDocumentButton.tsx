'use client'

import { Button } from "./ui/button";
import {useTransition} from "react";

function NewDocumentButton() {
  const handleCreateNewDocument=()=>{

  }
  return (
    <Button onClick={handleCreateNewDocument}>New Document</Button>
  )
}

export default NewDocumentButton;
