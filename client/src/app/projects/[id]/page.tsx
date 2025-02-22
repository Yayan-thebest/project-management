'use client';
import React, { useState } from 'react';
import ProjectHeader from '../ProjectHeader';
import Board from '../BoardView';
import List from "../ListView";
import TimeLine from '../TimelineView';
import Table from '../TableView';
import ModalNewTask from '@/components/ModalNewTask';


type Props = {
  params: Promise<{ id: string }>;  // params est maintenant une Promise
};

const Project = ({ params }: Props) => {
  const { id } = React.use(params); // Unwrap avec React.use()
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      <ModalNewTask 
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      { activeTab === "Board" && (
        <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
      )}
      { activeTab === "List" && (
        <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
      )}
      { activeTab === "Timeline" && (
        <TimeLine id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
      )}
      { activeTab === "Table" && (
        <Table id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen}/>
      )}
    </div>
  );
};

export default Project;
