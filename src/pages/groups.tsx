import FlashCardSubPage from "@/components/FlashCardSubPage";
import QuizCard from "@/components/QuizCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { extractTextFromPDF } from "@/utils/pdfreader";
import { GoogleGenAI } from "@google/genai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, EllipsisVertical, Mail, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/utils/supabase";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react"; // For toast icons

const Groups = () => {
  type QuizDatas = {
    created_at: string;
    desc: string;
    file_url: string;
    flashcard: null;
    gid: string;
    id: string;
    name: string;
    questions: Array<{
      id: number;
      question: string;
      A: string;
      B: string;
      C: string;
      D: string;
      ans: "A" | "B" | "C" | "D";
    }>; // Updated to match AI-generated structure
    uid: string;
  };

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quizzes, setquizzes] = useState<boolean>(true);
  const [flashcards, setflashcards] = useState<boolean>(false);
  const [selectedMembers, setselectedMembers] = useState<string[]>([]);
  const [emailValue, setemailValue] = useState<string>("");
  const [file, setfile] = useState<File | null>(null);
  const [qtitle, setqtitle] = useState<string>("");
  const [qdesc, setqdesc] = useState<string>("");
  const [gname, setgname] = useState<string>("");
  const [gdesc, setgdesc] = useState<string>("");
  const [quizData, setquizData] = useState<QuizDatas[]>([]);
  const [, setquizName] = useState<string>();
  const [, setquizdesc] = useState<string>();
  const [totalNumberOfUsers, setotalNumberOfUsers] = useState<number>(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const groupData = async () => {
      const { data, error } = await supabase
        .from("group")
        .select("*")
        .eq("id", id);
      if (error) {
        console.error("Error in fetching group data: ", error);
        return;
      } else if (data) {
        console.log("Group data fetched successfully: ", data);
        setgname(data[0].name);
        setgdesc(data[0].description);
      }
    };
    const getQuizzes = async () => {
      const { data, error } = await supabase
        .from("quiz")
        .select("*")
        .eq("gid", id);
      if (error) {
        console.error("Error in fetching group data: ", error);
        return;
      } else if (data) {
        console.log("Quiz data fetched successfully: ", data);
        setquizName(data[0]?.name); // Use optional chaining
        setquizData(data || []); // Ensure data is an array
        setquizdesc(data[0]?.desc); // Use optional chaining
      }
    };
    const getTotalNumberOfUsers = async () => {
      const { count, error } = await supabase
        .from("usergroup")
        .select("gid", { count: "exact" })
        .eq("gid", id);
      if (error) {
        console.error("Error fetching total number of users: ", error);
      } else {
        console.log("Total number of users in a given group: ", count);
        setotalNumberOfUsers(count || 0);
      }
    };

    groupData();
    getQuizzes();
    getTotalNumberOfUsers();
  }, [open]);

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyAPCr2YB4PdVLmMb0LhocHJDiYoMKtv2Tg",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setfile(e.target.files[0]);
    }
    console.log(e.target.files?.[0]);
  };

  const addMembers = () => {
    setselectedMembers((prevItems) => [...prevItems, emailValue]);
    setemailValue("");
  };

  const handleUploadToSupabase = async () => {
    if (!file) {
      toast.error("Please select a PDF file first.", {
        duration: 5000,
        icon: <XCircle className="h-5 w-5 text-red-500" />,
      });
      return;
    }

    try {
      const { data: fileUrl, error } = await supabase.storage
        .from("study-pal-pdfs")
        .upload(`questions/${Date.now()} -${file.name}`, file);
      if (error) throw error;

      console.log("Uploaded file path: ", fileUrl.path);
      const pdfText = await extractTextFromPDF(file);

      if (pdfText) {
        console.log("Content of PDF: ", pdfText);
      }
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-001",
        contents: `
          Based on the following PDF content, create 10 multiple-choice questions.
          Format the output exactly like this example:
          [
            {"id": 1, "question": "What is your name?", "A": "Mr x", "B": "Mr y", "C": "Mr z", "D": "None", "ans": "A"}
          ]

          Content:
          ${pdfText}
        `,
      });

      if (response.text) {
        console.log("AI Response: ", response.text);
        let rawText = response.text.trim();
        rawText = rawText.replace(/```json|```/g, "").trim();
        const jsonQuestions = JSON.parse(rawText); // Array of question objects
        const quiz = {
          name: qtitle,
          desc: qdesc,
          questions: jsonQuestions, // Store the array of questions
          gid: id,
          file_url: fileUrl.fullPath,
        };
        const { data, error } = await supabase
          .from("quiz")
          .insert(quiz)
          .select("*");

        if (error) {
          console.error("Error happened when inserting quiz: ", error);
          toast.error(`Failed to save quiz: ${error.message}`, {
            duration: 5000,
            icon: <XCircle className="h-5 w-5 text-red-500" />,
          });
          return;
        } else if (data) {
          console.log("Successfully inserted quiz: ", data);
          setquizData((prev) => [...prev, ...data]); // Append new quiz data
          toast.success("Quiz created successfully!", {
            duration: 3000,
            icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          });
          setOpen(false); // Close the dialog after success
        }
      }
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error("Failed to process PDF or generate questions", {
        duration: 5000,
        icon: <XCircle className="h-5 w-5 text-red-500" />,
      });
    }
  };

  const inviteGroup = async () => {
    const { data: userData, error: userError } = await supabase
      .from("user")
      .select("id,email")
      .in("email", selectedMembers);
    if (userError) {
      console.error("Error in finding user emails: ", userError);
      return;
    }
    if (userData?.length === 0) {
      console.error("No data found");
      return;
    }
    const insertUser = userData.map((user) => ({
      uid: user.id,
      gid: id,
      role: "user",
      hasJoined: true,
    }));
    const { error: insertError } = await supabase
      .from("usergroup")
      .insert(insertUser);
    if (insertError) {
      console.error("Error in inserting user into usergroup: ", insertError);
    } else {
      console.log("Members successfully added");
    }
  };

  return (
    <div className="">
      <div className="bg-white p-5 rounded-lg w-[100%]">
        <div className="flex justify-between">
          <div
            className="bg-gray-200 rounded-full p-2 text-black hover:shadow-lg"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <ArrowLeft />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="bg-purple-200 text-purple-700 w-full text-left mb-[2px] p-2">
                  Create Quiz
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Quiz</DialogTitle>
                    <span>Set up your quiz details and settings.</span>
                    <DialogDescription>
                      <div className="mb-4">
                        <span>Quiz Title</span>
                        <Input
                          placeholder="e.g. Introduction to Project Management"
                          onChange={(e) => setqtitle(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <span>Description</span>
                        <Input
                          placeholder="e.g. Introduction to Project Management"
                          onChange={(e) => setqdesc(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <span>Choose files</span>
                        <Input type="file" onChange={handleFileChange} />
                        <Button className="bg-gradient-to-r from-violet-500 to-indigo-400 m-2 w-[93%] md:w-30 hover:from-indigo-400 hover:to-violet-500 hover:duration-500" onClick={() => {
                          handleUploadToSupabase();
                        }}>
                          Generate Quiz
                        </Button>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Drawer>
                <DrawerTrigger className="text-green-700 bg-green-200 w-[100%] flex items-center mb-[2px] p-2">
                  Add Members
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Add Members to Group</DrawerTitle>
                    <span className="text-gray-400">
                      Invite new members to join your group and start learning
                      together.
                    </span>
                    <DrawerDescription>
                      <div className="flex items-center">
                        <Mail className="text-black mr-2 mb-2" />
                        <span className="text-black mb-2 font-medium">
                          Invite By Email
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Input
                          value={emailValue}
                          placeholder="Enter email"
                          onChange={(e) => setemailValue(e.target.value)}
                        />
                        <Button
                          className="bg-white border-gray-200 border-1 ml-2"
                          onClick={() => addMembers()}
                        >
                          <Plus className="text-gray-700" />
                        </Button>
                      </div>
                      <div>
                        <span className="text-left">
                          Selected Members({selectedMembers.length})
                        </span>
                        <div className="rounded-sm p-2 flex border-2 border-gray-200">
                          {selectedMembers.map((d) => (
                            <div
                              key={d}
                              className="rounded-2xl border-1 border-gray-600 p-2 m-2"
                            >
                              <span className="text-black font-semibold">
                                {d}
                              </span>
                              <span
                                className="font-semibold ml-2"
                                onClick={() => {
                                  setselectedMembers(
                                    selectedMembers.filter((m) => m !== d)
                                  );
                                }}
                              >
                                x
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <div className="flex justify-center">
                      <Button
                        className="bg-gradient-to-r from-violet-500 to-red-400 w-[80%] text-center md:w-[35%]"
                        onClick={() => {
                          inviteGroup();
                        }}
                      >
                        Add Members
                      </Button>
                    </div>
                    <DrawerClose>
                      <Button variant="outline" className="w-[80%] md:w-[35%]">
                        Cancel
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <DropdownMenuItem
                className="bg-yellow-300 text-yellow-700 p-3"
                onClick={() => {
                  navigate(`/groups/${id}/leaderboard`);
                }}
              >
                View LeaderBoard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <h2 className="text-2xl font-bold mt-2">{gname}</h2>
          <p className="text-[15px] text-gray-400">{gdesc}</p>
          <div className="flex justify-around mt-2">
            <div className="flex flex-col">
              <span className="text-violet-600 font-bold text-2xl">
                {totalNumberOfUsers}
              </span>
              <span className="text-gray-600">Members</span>
            </div>
            <div className="flex flex-col">
              <span className="text-green-600 font-bold text-2xl">
                {quizData.length}
              </span>
              <span className="text-gray-600">Quizzes</span>
            </div>
          </div>
          <div className="flex justify-between mt-5 bg-gray-300">
            <div
              className="bg-gray-100 rounded-none text-black w-[100%] p-2 text-center"
              onClick={() => {
                setquizzes(true);
                setflashcards(false);
              }}
            >
              Quizzes
            </div>
          </div>
          <h2 className="text-2xl font-bold">Current Quizzes</h2>
          {quizzes ? (
            <div>
              <div className="flex flex-col">
                {quizData && quizData.length > 0 ? (
                  quizData.map((d, i) => (
                    <QuizCard
                      key={i}
                      id={d.gid}
                      quizId={d.id}
                      name={d.name || "Untitled Quiz"}
                      desc={d.desc || "No description"}
                      time={d.created_at}
                      length={d.questions.length || 0} // Use d.questions.length directly
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-500">Quizzes not found</p>
                )}
              </div>
            </div>
          ) : flashcards ? (
            <FlashCardSubPage />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Groups;
